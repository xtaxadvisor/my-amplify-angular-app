"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var data_1 = require("aws-amplify/data");
var client = (0, data_1.generateClient)();
var TodosComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-todos',
            standalone: true,
            imports: [common_1.CommonModule],
            templateUrl: './todos.component.html',
            styleUrl: './todos.component.css',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TodosComponent = _classThis = /** @class */ (function () {
        function TodosComponent_1() {
            this.todos = [];
        }
        TodosComponent_1.prototype.ngOnInit = function () {
            this.listTodos();
        };
        TodosComponent_1.prototype.listTodos = function () {
            var _this = this;
            try {
                client.models.Todo.observeQuery().subscribe({
                    next: function (_a) {
                        var items = _a.items, isSynced = _a.isSynced;
                        _this.todos = items;
                    },
                });
            }
            catch (error) {
                console.error('error fetching todos', error);
            }
        };
        TodosComponent_1.prototype.createTodo = function () {
            try {
                client.models.Todo.create({
                    content: window.prompt('Todo content'),
                });
                this.listTodos();
            }
            catch (error) {
                console.error('error creating todos', error);
            }
        };
        return TodosComponent_1;
    }());
    __setFunctionName(_classThis, "TodosComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TodosComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TodosComponent = _classThis;
}();
exports.TodosComponent = TodosComponent;

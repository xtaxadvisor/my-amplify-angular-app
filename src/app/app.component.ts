import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TodosComponent } from './todos/todos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [TodosComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Allows usage of custom elements in the template
})
export class AppComponent {
  title = 'amplify-angular-template'; // Title of the application
}

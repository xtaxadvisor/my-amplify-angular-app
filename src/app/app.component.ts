import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TodosComponent } from './todos/todos.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, TodosComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add this line to allow custom elements
})
export class AppComponent {
  title = 'amplify-angular-template';
}

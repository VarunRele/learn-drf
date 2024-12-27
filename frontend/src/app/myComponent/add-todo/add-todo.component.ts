import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Todo } from '../../todo';

@Component({
  selector: 'app-add-todo',
  imports: [FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent {
  title!: String
  desc!: String
  @Output todoAdd: EventEmitter<Todo> = new EventEmitter()
  onSubmit() {
    console.log(this.title)
  }
}
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../todo';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  @Input() toda!: Todo
  @Output() todoDelete: EventEmitter<Todo> = new EventEmitter()
  onClick() {
    this.todoDelete.emit(this.toda)
    console.log("Click")
  }
}

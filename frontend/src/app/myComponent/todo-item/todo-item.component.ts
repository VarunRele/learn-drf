import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { Todo } from '../../todo';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  imports: [NgClass],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  @Input() toda!: Todo
  @Input() i!: number
  @Output() todoDelete: EventEmitter<Todo> = new EventEmitter()
  @Output() todoCheck: EventEmitter<Todo> = new EventEmitter()
  onClick() {
    this.todoDelete.emit(this.toda)
    console.log("Click")
  }
  onCheckboxClick(toda: Todo){
    this.todoCheck.emit(toda)
  }
}

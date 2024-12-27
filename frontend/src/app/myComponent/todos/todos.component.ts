import { Component } from '@angular/core';
import { Todo } from '../../todo';
import { NgFor } from '@angular/common';
import { TodoItemComponent } from "../todo-item/todo-item.component";
import { AddTodoComponent } from "../add-todo/add-todo.component";

@Component({
  selector: 'app-todos',
  imports: [NgFor, TodoItemComponent, AddTodoComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {
  todos!: Todo[]
  constructor() {
    this.todos = [
      {
        sno: 1,
        title: "This is a title 1",
        desc: "Something",
        active: true
      },
      {
        sno: 2,
        title: "This is a title 2",
        desc: "Something",
        active: true
      },
      {
        sno: 3,
        title: "This is a title 3",
        desc: "Something",
        active: false
      },
    ]
  }
  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo)
    this.todos.splice(index, 1)
  }
}

import { Component } from '@angular/core';
import { Todo } from '../../todo';
import { NgFor, NgIf} from '@angular/common';
import { TodoItemComponent } from "../todo-item/todo-item.component";
import { AddTodoComponent } from "../add-todo/add-todo.component";

@Component({
  selector: 'app-todos',
  imports: [NgFor, NgIf, TodoItemComponent, AddTodoComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {
  todos!: Todo[]
  localItem: string | null
  constructor() {
    this.todos = []
    this.localItem = localStorage.getItem("todos")
    if (this.localItem != null) {
      this.todos = JSON.parse(this.localItem)
    }
  }
  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo)
    this.todos.splice(index, 1)
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }
  addTodo(todo: Todo){
    console.log(todo)
    this.todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }
  checkTodo(todo: Todo){
    const index = this.todos.indexOf(todo)
    this.todos[index].active = !this.todos[index].active
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }
}

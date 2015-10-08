import { Component, Injectable } from "angular2/angular2";
import { Http, HTTP_BINDINGS, Headers } from 'angular2/http';
import { ITodoItem } from "./TodoItem";

export interface ITodoListService {
	todos: ITodoItem[];
	addTodo(task: string): void; // mybe return a promise
	removeTodo(id: number): void;
}

@Injectable()
export class TodoListService implements ITodoListService { // <- ES6 class
		
	// keeps the list of tasks 
	todos: ITodoItem[] = [];

	static $inject = ["$http"];
	constructor(
		private $http: Http
	) {
		$http.get("/api/list")
			.map((res: any) => {
				return res.json()
			})
			.subscribe((todos: ITodoItem[]) => { // <- ES6 arrow syntax!
				// do not change the instance! can be dangerous depending on how we do the bindings
				for (let itm of todos) { // <- Es6 for..of
					this.todos.push(itm);
				}
			});
	}
		
	/**
		 * adds a new task to the list!
		 */
	addTodo(task: string): void {
		this.$http.post("/api/list", JSON.stringify({ "task": task }), {
			headers: new Headers({ "content-type": "application/json" })
		})
			.map((res: any) => {
				return res.json()
			})
			.subscribe((newTodoItem: ITodoItem) => {
				// update the local copy
				this.todos.push(newTodoItem);
			});
	}
		
	/**
		 * removes a task from the list
		 */
	removeTodo(id: number): void {
		this.$http.delete("/api/list/" + id)
			.map((res: any) => {
				return res.json()
			})
			.subscribe((deletedItem: ITodoItem) => {
				// update the local list
				for (let i = 0; i < this.todos.length; i++) {
					if (this.todos[i].id === deletedItem.id) {
						this.todos.splice(i, 1);
						return;
					}
				}
			});
	}
}
	
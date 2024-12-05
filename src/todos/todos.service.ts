import { Injectable } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
    todos: Todo[] = [
        { id: 1, title: 'Todo list', completed: false },
        { id: 2, title: 'wine', completed: true },
        { id: 3, title: 'bread', completed: true },
    ];

    findAll(): Todo[]{
        return this.todos;
    }

    find(id: string): Todo {
        return this.todos.find(todo => todo.id === +id);
    }

    create(todo: CreateTodoDto) {
        this.todos = [...this.todos, todo];
    }

    update(id: number, updateTodo: UpdateTodoDto) {
        this.todos = this.todos.map(todo => {
            if (todo.id != id) {
                return todo;
            }
            if (updateTodo.title) {
                todo.title = updateTodo.title;
            }
            if (updateTodo.completed) {
                todo.completed = updateTodo.completed;
            }
            return todo;
        });
    }

    delete(id: string) {
        this.todos = this.todos.filter(todo => todo.id !== +id);
    }
}

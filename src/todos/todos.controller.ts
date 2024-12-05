import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Get()
    findAll(): Todo[] {
        return this.todosService.findAll();
    }

    @Get(':id')
    find(@Param('id') id: string): Todo {
        return this.todosService.find(id);
    }

    @Post('create')
    createTodo(@Body() newTodo: CreateTodoDto) {
        this.todosService.create(newTodo);
    }

    @Patch(':id')
    updateTodo(@Param('id') id: number,@Body() updatedTodo: UpdateTodoDto) {
        return this.todosService.update(id, updatedTodo);
    }

    @Delete(':id')
    deleteTodo(@Param('id') id: string) {
        this.todosService.delete(id);
        return 'Todo deleted';
    }
}

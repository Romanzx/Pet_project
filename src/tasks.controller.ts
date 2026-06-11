import { Controller, Get, Post, Delete, Put, Body, Param } from "@nestjs/common";
import { TasksService} from "./app.service";
import type { Task } from "./app.service";

@Controller('/products')
export class TasksController {
    constructor(private readonly taskservice: TasksService) {}
        @Get()
        getTasks() : Task[] {
            return this.taskservice.tasksAll();
        }

        @Post()
        createTask(@Body('text') text:string): Task {
            return this.taskservice.createTask(text);
        }

        @Delete(':id')
        deleteTask(@Param('id') id: string) : {success : boolean}{
            const success = this.taskservice.deleteTask(parseInt(id));
            return {success};
        }
        @Put(':id')
        updateTask(
            @Param('id') id: string,
            @Body() body: {text?: string, completed?: boolean}
        ): Task | null {
            return this.taskservice.updateTask(parseInt(id), body.text, body.completed);
        }
}
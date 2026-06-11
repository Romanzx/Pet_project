import { Injectable } from '@nestjs/common';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

@Injectable()
export class TasksService {
    private tasks: Task[] = [
      {id: 1, text: 'Buy milk', completed: false},
      {id: 2, text: 'Close the door', completed: false},
    ]
    tasksAll() : Task[] {
      return this.tasks;
    }
    createTask(text: string): Task {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
    };
    this.tasks.push(newTask);
    return newTask;
    } 
    deleteTask(id: number): boolean {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return true; 
    }
    return false;
    }
    updateTask(id: number, text?: string, completed?: boolean): Task | null{
      const task = this.tasks.find(task => task.id === id);
      if (!task) return null;
      if (text !== undefined) task.text = text;
      if (completed !== undefined) task.completed = completed;
      return task;
  }
}

import { Controller } from '@nestjs/common';
import { TasksService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: TasksService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// import { AppController } from './app.controller';
import { TasksController } from './tasks.controller';
import { TasksService } from './app.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveStaticOptions: {
        index: 'ToDo.html',
      },
    }),
    
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class AppModule {}
import { Module } from '@nestjs/common';
import { StatusModule } from '../status/status.module';
import { TaskControllerController } from './task.controller';
import { TaskServiceService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';

@Module({
  controllers: [TaskControllerController],
  providers: [TaskServiceService],
  exports: [TaskServiceService],
  imports: [StatusModule, TypeOrmModule.forFeature([TaskEntity])],
})
export class TaskModule {}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TaskServiceService } from '../task/task.service';
import { TaskDto } from './task.dto';

@Controller('tasks')
export class TaskControllerController {
  constructor(private readonly taskService: TaskServiceService) {}
  @Get()
  async findAll() {
    const tasks = await this.taskService.findAll();
    return tasks;
  }
  @Post()
  async addOne(@Body('taskDto') taskDto: TaskDto) {
    const task = await this.taskService.addOne(taskDto);
    return task;
  }
  @Delete(':taskId')
  deleteOne(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.taskService.deleteOneRecord(taskId);
  }
  // @Put(':id/done')
  // updateOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.taskService.updateOne(id);
  // }
}

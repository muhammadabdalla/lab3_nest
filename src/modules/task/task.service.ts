import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskDto } from './task.dto';
import { TaskEntity } from './task.entity';

@Injectable()
export class TaskServiceService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}
  async findAll() {
    const tasks = await this.taskRepository.find();
    return tasks;
  }
  async addOne(taskDto: TaskDto) {
    const task = this.taskRepository.create(taskDto);

    return this.taskRepository.save(task);
  }
  async deleteOneRecord(id: number) {
    const record = await this.taskRepository.findOneBy({ id: id });
    await record.remove();
    const allTasks = await this.taskRepository.find();
    return allTasks;
  }
  async updateOne(id: number) {
    const record = await this.taskRepository.findOneBy({ id: id });
    if (record) {
      await this.taskRepository
        .createQueryBuilder()
        .update(record)
        .set({ completed: true })
        .where('id = :id', { id: id })
        .execute();
    }

    const allTasks = await this.taskRepository.find();
    return allTasks;
  }
}

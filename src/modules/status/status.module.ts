import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusControllerController } from './status.controller';
import { StatusServiceService } from './status.service';
import { StatusEntity } from './status.entity';

@Module({
  controllers: [StatusControllerController],
  providers: [StatusServiceService],
  exports: [StatusServiceService],
  imports: [TypeOrmModule.forFeature([StatusEntity])],
})
export class StatusModule {}

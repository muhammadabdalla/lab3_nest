import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('task')
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('boolean', { default: false })
  completed: boolean;

  // @ManyToOne(() => UserEntity, (user: UserEntity) => user.tasks)
  // user: UserEntity;
}

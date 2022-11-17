import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { first_name, last_name, password, email, age } = createUserDto;

    const user = await this.userRepository.findOne({ where: { first_name } });

    if (user) {
      throw new BadRequestException('Duplicate record');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = this.userRepository.create({
      first_name,
      last_name,
      password: hashedPassword,
      email,
      age,
    });

    return this.userRepository.save(newUser);
  }

  async getUser(query: object): Promise<UserEntity> {
    return await this.userRepository.findOne(query);
  }

  // async findAll() {
  //   const users = await this.userRepository.find({ relations: ['tasks'] });
  //   return users;
  // }

  // async signIn(signInDto: SignInDto) {
  //   const { first_name, password } = signInDto;

  //   const user = await this.userRepository.findOne({
  //     where: { first_name },
  //     select: ['first_name', 'password'],
  //   });

  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }

  //   const isMatch = bcrypt.compareSync(password, user.password);

  //   if (!isMatch) {
  //     throw new UnauthorizedException();
  //   }

  //   return user;
  // }

  // async signUp(createUserDto: CreateUserDto): Promise<UserEntity> {
  //   const { first_name, last_name, password, email, age } = createUserDto;

  //   const user = await this.userRepository.findOne({ where: { first_name } });

  //   if (user) {
  //     throw new BadRequestException('Duplicate record');
  //   }

  //   const hashedPassword = bcrypt.hashSync(password, 10);

  //   const newUser = this.userRepository.create({
  //     first_name,
  //     last_name,
  //     password: hashedPassword,
  //     email,
  //     age,
  //   });

  //   return this.userRepository.save(newUser);
  // }
}

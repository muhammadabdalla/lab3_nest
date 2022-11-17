import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get()
  // async findAll() {
  //   const users = await this.userService.findAll();
  //   return users;
  // }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userService.signUp(createUserDto);
    console.log(user);
    return user;
  }

  // @Post('signin')
  // async signIn(@Body() signInDto: SignInDto): Promise<UserEntity> {
  //   const user = await this.userService.signIn(signInDto);
  //   return user;
  // }
}

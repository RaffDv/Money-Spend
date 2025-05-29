import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) { }

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.findByEmail(createUserDto.email)

    if (user) throw new ConflictException('User already exists!')


    return await this.userService.create(createUserDto)
  }
}

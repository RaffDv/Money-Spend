import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {

    const { password, ...rest } = createUserDto
    const hashedPassword = await hash(password)
    try {
      await this.prisma.user.create({
        data: {
          password: hashedPassword, ...rest
        }
      })

      return {
        statusCode: HttpStatus.CREATED,

      }
    } catch (error) {


      return {
        statusCode: HttpStatus.BAD_REQUEST,
        errorName: error.name,
        errorMsg: error.message
      }
    }
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }
}

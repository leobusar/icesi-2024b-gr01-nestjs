import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async createUser(createUserDto: CreateUserDto) {
        try {
            const {password,  ...rest} = createUserDto;
            const user = this.userRepository.create(
                {...rest,
                    password: bcrypt.hashSync(password, 10) 
        });
            await this.userRepository.save(user);
            return user;
        } catch (error) {
            console.log("*********ERROR *******", error.code);
            this.handleDBExceptions(error);
        }
    }

    private  handleDBExceptions(error: any) {
        if(error.code === '23505') {
          throw new BadRequestException('User already exists');
        }
        throw new InternalServerErrorException(error.code);
      }
}

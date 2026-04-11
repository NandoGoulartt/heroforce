import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/common/enums/user-role.enum';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  character: string;
  role?: UserRole;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  findById(id: string) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async create(data: CreateUserInput) {
    const user = this.userRepository.create({
      ...data,
      role: data.role ?? UserRole.USER,
    });

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/common/enums/user-role.enum';
import { Repository } from 'typeorm';
import { FilterUsersDto } from '../dto/filter-users.dto';
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

  async findAll(filters: FilterUsersDto) {
    const query = this.userRepository.createQueryBuilder('user');

    if (filters.name) {
      query.andWhere('LOWER(user.name) LIKE LOWER(:name)', {
        name: `%${filters.name}%`,
      });
    }

    if (filters.role) {
      query.andWhere('user.role = :role', {
        role: filters.role,
      });
    }

    query.orderBy('user.createdAt', 'DESC');

    return query.getMany();
  }
}

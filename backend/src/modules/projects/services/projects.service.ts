import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/common/enums/user-role.enum';
import { Repository } from 'typeorm';
import { CreateProjectDto } from '../dto/create-project.dto';
import { FilterProjectsDto } from '../dto/filter-projects.dto';
import { Project } from '../entities/project.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = this.projectRepository.create({
      ...createProjectDto,
      responsible: { id: createProjectDto.responsibleId },
    });

    return this.projectRepository.save(project);
  }

  async findAll(user: User, filters: FilterProjectsDto) {
    const query = this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.responsible', 'responsible');

    if (filters.status) {
      query.andWhere('project.status = :status', {
        status: filters.status,
      });
    }

    if (filters.responsibleId) {
      query.andWhere('project.responsible_id = :responsibleId', {
        responsibleId: filters.responsibleId,
      });
    }

    if (user.role !== UserRole.ADMIN) {
      query.andWhere('project.responsible_id = :userId', {
        userId: user.id,
      });
    }

    return query.getMany();
  }
}

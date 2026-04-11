import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/common/enums/user-role.enum';
import type { AuthUser } from 'src/modules/auth/types/auth-user.type';
import { Repository } from 'typeorm';
import { CreateProjectDto } from '../dto/create-project.dto';
import { FilterProjectsDto } from '../dto/filter-projects.dto';
import { UpdateGoalsDto } from '../dto/update-goals.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { Project } from '../entities/project.entity';

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

  async findAll(user: AuthUser, filters: FilterProjectsDto) {
    const query = this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.responsible', 'responsible');

    if (filters.name) {
      query.andWhere('LOWER(project.name) LIKE LOWER(:name)', {
        name: `%${filters.name}%`,
      });
    }

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

  async findOne(id: string, user: AuthUser) {
    const query = this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.responsible', 'responsible')
      .where('project.id = :id', { id });

    if (user.role !== UserRole.ADMIN) {
      query.andWhere('project.responsible_id = :userId', {
        userId: user.id,
      });
    }

    const project = await query.getOne();

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['responsible'],
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const updatedProject = this.projectRepository.merge(project, {
      ...updateProjectDto,
      ...(updateProjectDto.responsibleId && {
        responsible: { id: updateProjectDto.responsibleId },
      }),
    });

    return this.projectRepository.save(updatedProject);
  }

  async remove(id: string) {
    const project = await this.projectRepository.findOne({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await this.projectRepository.remove(project);

    return {
      message: 'Project deleted successfully',
    };
  }

  async updateGoals(
    id: string,
    updateGoalsDto: UpdateGoalsDto,
    user: AuthUser,
  ) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['responsible'],
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (user.role !== UserRole.ADMIN && project.responsible.id !== user.id) {
      throw new ForbiddenException('You cannot update this project');
    }

    const updatedGoals = project.goals.map((existingGoal) => {
      const updated = updateGoalsDto.goals.find(
        (g) => g.name === existingGoal.name,
      );

      if (!updated) return existingGoal;

      return {
        ...existingGoal,
        current: updated.current,
      };
    });

    project.goals = updatedGoals;

    return this.projectRepository.save(project);
  }
}

import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import type { AuthUser } from 'src/modules/auth/types/auth-user.type';
import { CreateProjectDto } from '../dto/create-project.dto';
import { FilterProjectsDto } from '../dto/filter-projects.dto';
import { ProjectsService } from '../services/projects.service';
import { RolesGuard } from 'src/common/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll(@CurrentUser() user: AuthUser, @Query() filters: FilterProjectsDto) {
    return this.projectsService.findAll(user, filters);
  }
}

import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { ProjectStatus } from 'src/common/enums/project-status.enum';

export class FilterProjectsDto {
  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @IsOptional()
  @IsUUID()
  responsibleId?: string;
}

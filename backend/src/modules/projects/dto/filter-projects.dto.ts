import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ProjectStatus } from 'src/common/enums/project-status.enum';

export class FilterProjectsDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @IsOptional()
  @IsUUID()
  responsibleId?: string;
}

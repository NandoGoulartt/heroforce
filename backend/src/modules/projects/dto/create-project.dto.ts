import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { ProjectStatus } from 'src/common/enums/project-status.enum';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(ProjectStatus)
  status: ProjectStatus;

  @IsString()
  @IsNotEmpty()
  goals: string;

  @IsInt()
  @Min(0)
  @Max(100)
  progress: number;

  @IsUUID()
  responsibleId: string;
}

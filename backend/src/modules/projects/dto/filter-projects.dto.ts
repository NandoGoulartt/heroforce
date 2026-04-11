import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ProjectStatus } from 'src/common/enums/project-status.enum';

export class FilterProjectsDto {
  @ApiProperty({ example: 'Metrpolis' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'PENDING' })
  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsOptional()
  @IsUUID()
  responsibleId?: string;
}

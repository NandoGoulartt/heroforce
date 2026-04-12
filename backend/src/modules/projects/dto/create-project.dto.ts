import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProjectStatus } from 'src/common/enums/project-status.enum';

export class CreateProjectDto {
  @ApiProperty({ example: 'Salvar Metrpolis' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Zod esta atacando Metrpolis' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'PENDING' })
  @IsEnum(ProjectStatus)
  status: ProjectStatus;

  @ApiProperty({
    example: [{ name: 'Max numero de mortes', target: 10, current: 0 }],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => GoalDto)
  goals: GoalDto[];

  @ApiProperty({ example: 0 })
  @IsInt()
  @Min(0)
  @Max(100)
  progress: number;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  responsibleId: string;
}

class GoalDto {
  @ApiProperty({ example: 'Max numero de mortes' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 250 })
  @IsInt()
  @Min(1)
  target: number;

  @ApiProperty({ example: 120 })
  @IsInt()
  @Min(0)
  current: number;
}

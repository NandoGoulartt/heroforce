import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

class UpdateGoalDto {
  @ApiProperty({ example: 'Max numero de mortes' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(0)
  @Max(100)
  current: number;
}

export class UpdateGoalsDto {
  @ApiProperty({
    example: [{ name: 'Max numero de mortes', current: 0 }],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpdateGoalDto)
  goals: UpdateGoalDto[];
}

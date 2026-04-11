import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from 'src/common/enums/user-role.enum';

export class FilterUsersDto {
  @ApiProperty({ example: 'Clark Kent' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'ADMIN' })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

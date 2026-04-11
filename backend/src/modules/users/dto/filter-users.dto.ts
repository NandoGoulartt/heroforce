import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from 'src/common/enums/user-role.enum';

export class FilterUsersDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

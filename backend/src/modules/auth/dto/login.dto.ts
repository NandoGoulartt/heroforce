import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'clark@heroforce.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'kryptonita' })
  @IsString()
  @MinLength(6)
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Clark Kent' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'clark@heroforce.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'kryptonita' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Superman' })
  @IsString()
  @IsNotEmpty()
  character: string;
}

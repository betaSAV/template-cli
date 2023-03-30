---
to: <%= cwd %>/<%=project%>/src/auth/dto/login.dto.ts
unless_exists: true
---
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  @Length(3, 256)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

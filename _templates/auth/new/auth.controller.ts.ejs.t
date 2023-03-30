---
to: <%= cwd %>/<%=project%>/src/auth/auth.controller.ts
unless_exists: true
---
import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Post,
    UseInterceptors,
  } from '@nestjs/common';
  import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  import { AuthService } from './auth.service';
  import { JwtDto } from './dto/jwt.dto';
  import { LoginDto } from './dto/login.dto';
  import { Public } from './public.decorator';
  
  @ApiTags('Auth')
  @UseInterceptors(ClassSerializerInterceptor)
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Public()
    @Post('login')
    @ApiOperation({ summary: 'Login into the API' })
    @ApiResponse({ status: 200, type: JwtDto })
    async login(@Body() login: LoginDto): Promise<JwtDto> {
        return this.authService.login(login.email, login.password);
    }
  }
  
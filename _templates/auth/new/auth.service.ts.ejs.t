---
to: <%= cwd %>/<%=project%>/src/auth/auth.service.ts
unless_exists: true
---
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtDto } from './dto/jwt.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    throw new Error('Not implemented');
  }

  async login(email: string, password: string): Promise<JwtDto> {
    const user = await this.validateUser(email, password);
    const payload = {
      sub: user.id,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}

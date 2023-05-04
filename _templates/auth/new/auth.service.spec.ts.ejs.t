---
to: <%= cwd %>/<%=project%>/src/auth/auth.service.spec.ts
unless_exists: true
---
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    process.env.JWT_SECRET = 'jwtsecret';
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: 'secret',
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [AuthService, JwtStrategy, ConfigService],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

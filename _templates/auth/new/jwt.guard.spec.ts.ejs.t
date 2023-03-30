---
to: <%= cwd %>/<%=project%>/src/auth/jwt.guard.spec.ts
unless_exists: true
---
import { ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import { JwtAuthGuard } from './jwt.guard';
import { JwtStrategy } from './jwt.strategy';

describe('Jwt Auth Guard', () => {
  let jwtAuthGuard: JwtAuthGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PassportModule],
      providers: [
        JwtAuthGuard,
        JwtStrategy,
        {
          provide: Reflector,
          useValue: { getAllAndOverride: jest.fn() },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              return 'secret';
            }),
          },
        },
      ],
    }).compile();

    jwtAuthGuard = moduleRef.get<JwtAuthGuard>(JwtAuthGuard);
    reflector = moduleRef.get<Reflector>(Reflector);
  });

  describe('canActivate', () => {
    it('should return true if method is anotated with @Public', () => {
      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockImplementation((_key, ..._args) => false)
        .mockImplementationOnce((_key, ..._args) => true);

      expect(
        jwtAuthGuard.canActivate({
          getHandler: () => {},
          getClass: () => {},
          switchToHttp: () => ({
            getRequest: () => ({
              headers: {
                authorization: '',
              },
            }),
            getResponse: () => ({}),
          }),
        } as ExecutionContext),
      ).toBeTruthy();
    });

    it('should return true if request includes JWT token', () => {
      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockImplementation((_key, ..._args) => false);

      expect(
        jwtAuthGuard.canActivate({
          getHandler: () => {},
          getClass: () => {},
          switchToHttp: () => ({
            getRequest: () => ({
              headers: {
                authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o`,
              },
            }),
            getResponse: () => ({}),
          }),
        } as ExecutionContext),
      ).toBeTruthy();
    });
  });
});

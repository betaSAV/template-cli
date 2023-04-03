---
to: <%= cwd %>/<%=project%>/src/auth/dto/jwt.dto.ts
unless_exists: true
---
import { ApiProperty } from '@nestjs/swagger';

export class JwtDto {
  @ApiProperty()
  accessToken: string;
}

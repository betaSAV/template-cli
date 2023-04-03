---
inject: true
to: <%= cwd %>/<%=project%>/src/app.module.ts
skip_if: "{ AuthModule }"
before: "import"
---
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
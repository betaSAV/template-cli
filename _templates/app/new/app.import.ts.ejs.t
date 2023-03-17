---
inject: true
to: <%= cwd %>/<%=project%>/src/app.module.ts
skip_if: "{ TypeOrmModule }"
before: "import"
---
import { TypeOrmModule } from '@nestjs/typeorm';
---
inject: true
to: <%= cwd %>/<%=project%>/src/main.ts
skip_if: "{ ValidationPipe }"
before: "import"
---
import { ValidationPipe } from '@nestjs/common';
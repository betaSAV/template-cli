---
inject: true
to: <%= cwd %>/<%=project%>/src/app.module.ts
skip_if: "import { ThrottlerModule }"
before: "import"
---
import { ThrottlerModule } from '@nestjs/throttler';
---
inject: true
to: <%= cwd %>/<%=project%>/src/main.ts
sh: sed -i "s/import { ValidationPipe } from '@nestjs\/common';/import { ValidationPipe, INestApplication } from '@nestjs\/common';/" <%= cwd %>/<%=project%>/src/main.ts
skip_if: "@nestjs/swagger"
before: "import"
---
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
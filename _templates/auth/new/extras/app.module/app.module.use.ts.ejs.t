---
inject: true
to: <%= cwd %>/<%=project%>/src/app.module.ts
skip_if: "AuthModule,"
after: "\\}\\),"
---
ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.example' }),
AuthModule,
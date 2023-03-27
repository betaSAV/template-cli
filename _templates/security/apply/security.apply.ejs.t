---
inject: true
to: <%= cwd %>/<%=project%>/src/main.ts
skip_if: "helmet()"
before: ".listen"
---
app.use(helmet());
app.enableCors();
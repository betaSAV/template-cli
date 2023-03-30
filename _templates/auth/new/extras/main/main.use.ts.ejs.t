---
inject: true
to: <%= cwd %>/<%=project%>/src/main.ts
skip_if: "new ValidationPipe()"
before: ".listen"
---
app.useGlobalPipes(new ValidationPipe());
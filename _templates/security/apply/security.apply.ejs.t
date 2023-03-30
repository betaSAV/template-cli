---
inject: true
to: <%= cwd %>/<%=project%>/src/main.ts
skip_if: "helmet()"
after: "const app"
---
// Helmet must be defined before any other app.use
app.use(helmet());
app.enableCors();
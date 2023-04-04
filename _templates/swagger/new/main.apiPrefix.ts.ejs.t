---
inject: true
to: <%= cwd %>/<%=project%>/src/main.ts
skip_if: "app.setGlobalPrefix"
before: "app.listen"
---
  const globalApiPrefix = 'api';
  app.setGlobalPrefix(globalApiPrefix);
  bindSwaggerDocument(globalApiPrefix, app);
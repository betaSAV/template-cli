---
inject: true
to: <%= cwd %>/<%=project%>/src/main.ts
skip_if: "globalApiPrefix"
before: "3000"
---
  const globalApiPrefix = 'api';
  app.setGlobalPrefix(globalApiPrefix);
  bindSwaggerDocument(globalApiPrefix, app);
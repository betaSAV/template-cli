---
inject: true
to: <%= cwd %>/<%=project%>/src/app.module.ts
skip_if: "ThrottlerModule.forRoot"
after: "imports:"
---
ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
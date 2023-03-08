---
inject: true
to: <%= cwd %>/src/<%=name%>/<%=name%>.service.ts
after: "Service {"
skip_if: "Service: "
---

  constructor(
    private readonly testPersistenceService: TestPersistenceService
  ) {}
  
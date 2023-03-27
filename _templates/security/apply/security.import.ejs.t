---
inject: true
to: <%= cwd %>/<%=project%>/src/main.ts
skip_if: "import helmet"
before: "import"
---
import helmet from 'helmet';
---
inject: true
to: <%= cwd %>/<%=project%>/src/<%=name%>/<%=name%>.controller.ts
skip_if: "{ GenericController }"
before: "import"
---
import { GenericController } from 'src/controller/generic.controller';
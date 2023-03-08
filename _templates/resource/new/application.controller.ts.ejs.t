---
inject: true
prepend: true
to: <%= cwd %>/src/<%=name%>/<%=name%>.controller.ts
skip_if: "import { GenericController }"
---
import { GenericController } from 'src/controller/generic.controller';
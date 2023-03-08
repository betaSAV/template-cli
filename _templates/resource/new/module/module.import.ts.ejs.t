---
inject: true
prepend: true
to: <%= cwd %>/src/<%=name%>/<%=name%>.module.ts
skip_if: "import { <%=Name%>PersistenceService }"
---
import { <%=Name%>PersistenceService } from './<%=name%>.persistence';
---
inject: true
to: <%= cwd %>/<%=project%>/src/<%=name%>/<%=name%>.module.ts
skip_if: "PersistenceService }"
before: "import"
---
import { <%=Name%>PersistenceService } from './<%=name%>.persistence';
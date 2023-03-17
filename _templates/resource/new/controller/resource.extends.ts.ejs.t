---
sh: |
      sed -i "s/<%=Name%>Controller {/<%=Name%>Controller extends GenericController {/" <%= cwd %>/<%=project%>/src/<%=name%>/<%=name%>.controller.ts
---
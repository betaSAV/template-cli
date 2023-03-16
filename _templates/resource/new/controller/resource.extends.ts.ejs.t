---
sh: |
      sed -i "s/Controller {/Controller extends GenericController {/" <%= cwd %>/<%=project%>/src/<%=name%>/<%=name%>.controller.ts
---
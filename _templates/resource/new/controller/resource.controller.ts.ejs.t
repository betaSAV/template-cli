---
sh: |
      sed -i "s/{}/{super();}/" <%= cwd %>/<%=project%>/src/<%=name%>/<%=name%>.controller.ts
---
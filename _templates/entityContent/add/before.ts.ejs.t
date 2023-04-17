---
sh: |
    sed -i 's/{}/{/' <%= cwd %>/<%=project%>/src/<%=name%>/entities/<%=name%>.entity.ts
---
---
sh: |
      sed -i "s/\(imports:\s*\[\)\(.*\)\(\]\)/\1\n  \]/" <%= cwd %>/<%=project%>/src/app.module.ts
---
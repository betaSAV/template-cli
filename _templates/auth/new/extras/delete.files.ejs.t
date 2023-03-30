---
sh: rm -f <%= cwd %>/<%=project%>/src/app.controller.spec.ts <%= cwd %>/<%=project%>/src/app.controller.ts <%= cwd %>/<%=project%>/src/app.service.ts && sed -i '/AppController/d; /AppService/d' <%= cwd %>/<%=project%>/src/app.module.ts
---
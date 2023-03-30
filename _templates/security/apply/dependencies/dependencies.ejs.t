---
inject: true
to: <%= cwd %>/<%=project%>/package.json
after: dependencies
skip_if: "helmet"
sh: cd <%= cwd %>/<%=project%> && <%= packageManager %> install
---
    "helmet": "^6.0.1",
    "@nestjs/throttler": "^4.0.0",
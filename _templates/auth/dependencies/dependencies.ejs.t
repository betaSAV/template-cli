---
inject: true
to: <%= cwd %>/<%=project%>/package.json
after: dependencies
skip_if: "@nestjs/jwt"
sh: cd <%= cwd %>/<%=project%> && <%= packageManager %> install
---
    "@nestjs/jwt": "^10.0.2",
    "passport-jwt": "^4.0.0",
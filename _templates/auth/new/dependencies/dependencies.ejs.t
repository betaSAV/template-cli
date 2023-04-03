---
inject: true
to: <%= cwd %>/<%=project%>/package.json
after: dependencies
skip_if: "@nestjs/jwt"
sh: cd <%= cwd %>/<%=project%> && <%= packageManager %> install
---
    "@nestjs/config": "^2.3.1",
    "@nestjs/jwt": "^10.0.2",
    "@nestjs/passport": "^9.0.3",
    "passport-jwt": "^4.0.0",
    "passport": "^0.6.0",
    "passport-local": "^1.0.0",

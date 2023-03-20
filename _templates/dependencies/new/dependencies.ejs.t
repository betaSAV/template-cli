---
inject: true
to: <%= cwd %>/<%=project%>/package.json
after: dependencies
skip_if: "@nestjs/swagger"
sh: cd <%= cwd %>/<%=project%> && <%= packageManager %> install
---
    "@nestjs/swagger": "^6.2.1",
    "@nestjs/typeorm": "^9.0.1",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.0",
    "typeorm": "^0.3.12",
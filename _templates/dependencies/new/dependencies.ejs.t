---
inject: true
to: <%= cwd %>/<%=project%>/package.json
after: dependencies
skip_if: "@nestjs/swagger"
---
    "@nestjs/swagger": "*",
    "@nestjs/typeorm": "*",
    "class-transformer": "*",
    "class-validator": "*",
    "typeorm": "*",
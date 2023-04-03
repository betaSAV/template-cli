---
inject: true
to: <%= cwd %>/<%=project%>/package.json
after: devDependencies
skip_if: "@types/passport-jwt"
sh: cd <%= cwd %>/<%=project%> && <%= packageManager %> install
---
    "@types/passport-jwt": "^3.0.8",
    "@types/passport-local": "^1.0.35",

---
inject: true
to: <%= cwd %>/<%=project%>/package.json
after: devDependencies
skip_if: "prettier"
sh: cd <%= cwd %>/<%=project%> && <%= packageManager %> install
---
    "prettier": "^2.8.6",
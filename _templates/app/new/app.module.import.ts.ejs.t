---
sh: |
      sed -i "s/\(imports:\s*\[\)\(.*\)\(\]\)/\1\n    TypeOrmModule.forRoot({\n        type: '',\n        host: 'localhost',\n        port: 0,\n        username: 'root',\n        password: 'root',\n        database: 'test',\n        entities: [],\n        synchronize: true,\n    }),\n  \]/" <%= cwd %>/<%=project%>/src/app.module.ts
---
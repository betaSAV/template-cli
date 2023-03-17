---
sh: |
      sed -i "s/<%=Name%>Service\]/<%=Name%>Service, <%=Name%>PersistenceService],\nimports: [TypeOrmModule.forFeature([<%=Name%>])],\nexports: [<%=Name%>Service],/" <%= cwd %>/<%=project%>/src/<%=name%>/<%=name%>.module.ts
---

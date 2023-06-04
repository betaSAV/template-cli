---
sh: |
      sed -i "s/<%=Name%>Service\]/<%=Name%>Service, <%=Name%>PersistenceService],\nexports: [<%=Name%>Service],/" <%= cwd %>/<%=project%>/src/<%=name%>/<%=name%>.module.ts
---

---
sh: |
      sed -i "s/<%=Name%>Service\]/<%=Name%>Service, <%=Name%>PersistenceService]/" <%= cwd %>/<%=project%>/src/<%=name%>/<%=name%>.module.ts
---

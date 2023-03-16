---
sh: |
      sed -i "s/Service\]/Service, <%=Name%>PersistenceService]/" <%= cwd %>/<%=project%>/src/<%=name%>/<%=name%>.module.ts
---

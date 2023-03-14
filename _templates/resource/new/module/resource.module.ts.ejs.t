---
to: <%= cwd %>/<%=project%>/src/<%=name%>/<%=name%>.module.ts
force: true
---
import { Module } from '@nestjs/common';
import { <%=Name%>Service } from './<%=name%>.service';
import { <%=Name%>Controller } from './<%=name%>.controller';
import { <%=Name%>PersistenceService } from './<%=name%>.persistence';

@Module({
  controllers: [<%=Name%>Controller],
  providers: [<%=Name%>Service, <%=Name%>PersistenceService]
})
export class <%=Name%>Module {}
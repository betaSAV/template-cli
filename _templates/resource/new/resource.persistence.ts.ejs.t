---
to: <%= cwd %>/<%=project%>/src/<%=name%>/<%=name%>.persistence.ts
unless_exists: true
---
import { Injectable } from '@nestjs/common';
import { <%=Name%> } from './entities/<%=name%>.entity';

@Injectable()
export class <%=Name%>PersistenceService {
  private <%= h.inflection.pluralize(name) %>: <%=Name%>[] = [];

  findAll(): <%=Name%>[] {
    return this.<%= h.inflection.pluralize(name) %>;
  }

  create(<%=name%>: <%=Name%>): void {
    this.<%= h.inflection.pluralize(name) %>.push(<%=name%>);
  }
}

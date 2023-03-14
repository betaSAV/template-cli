---
to: <%= cwd %>/<%=project%>/src/<%=name%>/<%=name%>.persistence.ts
force: true
---
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasePersistence } from 'src/persistence/base.persistence';
import { Repository } from 'typeorm';
import { <%=Name%> } from './entities/<%=name%>.entity';

@Injectable()
export class <%=Name%>PersistenceService extends BasePersistence<<%=Name%>> {
  constructor(
    @InjectRepository(<%=Name%>)
    protected readonly repository: Repository<<%=Name%>>,
  ) {
    super();
  }
}

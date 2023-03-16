---
to: <%= cwd %>/<%=project%>/src/<%=name%>/entities/<%=name%>.entity.ts
skip_if: "BaseEntity"
---
import { BaseEntity } from 'src/persistence/base.entity';

export class <%=Name%> extends BaseEntity {}

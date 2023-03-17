---
to: <%= cwd %>/<%=project%>/src/<%=name%>/entities/<%=name%>.entity.ts
force: true
skip_if: "BaseEntity"
---
import { BaseEntity } from 'src/persistence/base.entity';

export class <%=Name%> extends BaseEntity {}

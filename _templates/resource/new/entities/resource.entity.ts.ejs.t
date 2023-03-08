---
to: <%= cwd %>/src/<%=name%>/entities/<%=name%>.entity.ts
force: true
---
import { BaseEntity } from 'src/persistence/base.entity';

export class Test extends BaseEntity {}

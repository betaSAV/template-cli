---
inject: true
prepend: true
to: <%= cwd %>/src/<%=name%>/entities/<%=name%>.entity.ts
skip_if: "import { BaseEntity }"
---
import { BaseEntity } from 'src/persistence/base.entity';

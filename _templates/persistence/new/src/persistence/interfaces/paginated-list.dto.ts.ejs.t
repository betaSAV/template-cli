---
to: <%= cwd %>/<%=project%>/src/persistence/interfaces/paginated-list.dto.ts
unless_exists: true
---
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedListDto<T> {
  @ApiProperty()
  list: T[];

  @ApiProperty()
  total: number;
}

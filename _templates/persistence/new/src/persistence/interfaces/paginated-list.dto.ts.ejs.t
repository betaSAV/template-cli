---
to: <%= cwd %>/src/persistence/interfaces/paginated-list.dto.ts
force: true
---
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedListDto<T> {
  @ApiProperty()
  list: T[];

  @ApiProperty()
  total: number;
}

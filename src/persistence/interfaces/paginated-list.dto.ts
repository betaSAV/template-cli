import { ApiProperty } from '@nestjs/swagger';

export class PaginatedListDto<T> {
  @ApiProperty()
  list: T[];

  @ApiProperty()
  total: number;
}

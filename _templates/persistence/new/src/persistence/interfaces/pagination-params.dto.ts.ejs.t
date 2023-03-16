---
to: <%= cwd %>/<%=project%>/src/persistence/interfaces/pagination-params.dto.ts
unless_exists: true
---
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SortDirection } from 'src/persistence/enum/sort-direction.enum';

export class PaginationParamsDto {
  @ApiPropertyOptional()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  offset?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiPropertyOptional({ enum: SortDirection })
  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection?: SortDirection;
}

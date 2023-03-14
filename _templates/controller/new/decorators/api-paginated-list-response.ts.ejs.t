---
to: <%= cwd %>/<%= name %>/src/controller/decorators/api-paginated-list-response.ts
force: true
---
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { applyDecorators, Type } from '@nestjs/common';
import { PaginatedListDto } from 'src/persistence/interfaces/paginated-list.dto';

export const ApiPaginatedListResponse = <T extends Type<unknown>>(
  entity: T,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedListDto) },
          {
            properties: {
              list: {
                type: 'array',
                items: { $ref: getSchemaPath(entity) },
              },
            },
          },
        ],
      },
    }),
  );
};

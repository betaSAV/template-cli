---
to: <%= cwd %>/<%=project%>/src/persistence/utils/to-find-options.ts
force: true
---
import {
  Between,
  FindConditions,
  FindManyOptions,
  FindOperator,
  LessThanOrEqual,
  MoreThanOrEqual,
} from 'typeorm';
import { BaseEntity } from '../base.entity';
import { SortDirection } from '../enum/sort-direction.enum';
import { PaginationParamsDto } from '../interfaces/pagination-params.dto';

export const toFindOptions = <
  T extends BaseEntity,
  U extends PaginationParamsDto,
>(
  paginationParams: U,
): FindManyOptions<T> => {
  const findManyOptions = {} as FindManyOptions<T>;
  if (!!paginationParams) {
    const { limit, offset, sort, sortDirection } = paginationParams;
    findManyOptions.take = limit || 6;
    findManyOptions.skip = offset || 0;
    if (!!sort && sort.length > 0) {
      const order = {};
      order[sort] = sortDirection ?? SortDirection.ASC;
      findManyOptions.order = order;
    }
  }
  return findManyOptions;
};

export const toRange = <T>(
  column: string,
  from?: T,
  to?: T,
): { string?: FindOperator<FindConditions<T>> } => {
  const operator = {};
  if (!!from && !!to) {
    operator[column] = Between(from, to);
  } else if (!!from && !to) {
    operator[column] = MoreThanOrEqual(from);
  } else if (!from && !!to) {
    operator[column] = LessThanOrEqual(to);
  } else {
  }
  return operator;
};

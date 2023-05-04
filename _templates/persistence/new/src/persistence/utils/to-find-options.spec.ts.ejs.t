---
to: <%= cwd %>/<%=project%>/src/persistence/utils/to-find-options.spec.ts
unless_exists: true
---
import {
  Between,
  FindManyOptions,
  LessThanOrEqual,
  MoreThanOrEqual,
} from 'typeorm';
import { SortDirection } from '../enum/sort-direction.enum';
import { toFindOptions, toRange } from './to-find-options';

describe('Persistence Utils', () => {
  describe('toFindOptions', () => {
    it('should return empty options if no input is provided', () => {
      expect(toFindOptions(null)).toStrictEqual({} as FindManyOptions);
    });

    it('should return default if optionals parameters are not set', () => {
      expect(toFindOptions({
        page: 0
      })).toStrictEqual({
        take: 6,
        skip: 0,
      });
    });

    it('should return correct sort', () => {
      return expect(
        toFindOptions({
          limit: 10,
          offset: 10,
          sort: 'name',
          sortDirection: SortDirection.DESC,
          page: 0
        })
      ).toStrictEqual({
        take: 10,
        skip: 10,
        order: {
          name: SortDirection.DESC,
        },
      });
    });

    it('should return default sort direction if none is provided', () => {
      expect(
        toFindOptions({
          limit: 10,
          offset: 10,
          sort: 'name',
          page: 0
        }),
      ).toStrictEqual({
        take: 10,
        skip: 10,
        order: {
          name: SortDirection.ASC,
        },
      });
    });
  });

  describe('toRange', () => {
    it('should return empty object if no limits are provided', () => {
      expect(toRange('test')).toStrictEqual({});
    });

    it('should return MoreThanOrEqual if no upper limit is provided', () => {
      const lowerLimit = 1;
      expect(toRange('test', lowerLimit)).toStrictEqual({
        test: MoreThanOrEqual(lowerLimit),
      });
    });

    it('should return LessThanOrEqual if no lower limit is provided', () => {
      const upperLimit = 1;
      expect(toRange('test', null, upperLimit)).toStrictEqual({
        test: LessThanOrEqual(upperLimit),
      });
    });

    it('should return Between when both limits are provided', () => {
      const upperLimit: number = 3;
      const lowerLimit: number = 4;
      expect(toRange('test', lowerLimit, upperLimit)).toEqual({
        test: Between(lowerLimit, upperLimit),
      });
    });
  });
});
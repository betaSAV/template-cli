---
to: ../waap-director/src/persistence/base.persistence.ts
force: true
---
import {
  DeleteResult,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  RemoveOptions,
  Repository,
} from 'typeorm';
import { BaseEntity } from './base.entity';

export abstract class BasePersistence<T extends BaseEntity> {
  protected repository: Repository<T>;

  find(conditions?: FindConditions<T>): Promise<T[]> {
    return this.repository.find(conditions);
  }

  findOne(options?: FindOneOptions<T>): Promise<T> {
    return this.repository.findOne(options);
  }

  findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  findPaginated(params: PaginationParamsDto, options?: FindManyOptions<T>): Promise<PaginatedListDto<T>> {
    return this.repository.find(options);
  }

  findAndCount(options?: FindManyOptions<T>): Promise<[T[], number]> {
    return this.repository.findAndCount(options);
  }

  findById(id: string, options?: FindOneOptions<T>): Promise<T> {
    return this.repository.findOne(id, options);
  }

  findByIds(ids: string[], options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.findByIds(ids, options);
  }

  deleteEntity(entity: T, options?: RemoveOptions): Promise<T> {
    return this.repository.remove(entity, options);
  }

  deleteById(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  insert(entity: T, author: string): Promise<T> {
    entity.createdBy = author;
    entity.lastChangedBy = author;
    return this.repository.save(entity as any);
  }

  save(entity: T, author: string): Promise<T> {
    entity.lastChangedBy = author;
    return this.repository.save(entity as any);
  }

  count(options?: FindManyOptions<T>): Promise<number> {
    return this.repository.count(options);
  }
}

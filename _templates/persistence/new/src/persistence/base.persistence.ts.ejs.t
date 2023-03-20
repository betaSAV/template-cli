---
to: <%= cwd %>/<%=project%>/src/persistence/base.persistence.ts
unless_exists: true
---
import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  RemoveOptions,
  Repository,
} from 'typeorm';
import { BaseEntity } from './base.entity';

export abstract class BasePersistence<T extends BaseEntity> {
  protected repository: Repository<T>;

  find(conditions?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(conditions);
  }

  findOne(options?: FindOneOptions<T>): Promise<T> {
    return this.repository.findOne(options);
  }

  findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async findPaginated(params: PaginationParamsDto, options?: FindManyOptions<T>): Promise<PaginatedListDto<T>> {
    const { page, limit } = params;
    const skip = (page - 1) * limit;
    const take = limit;
    const query = { ...options, skip, take };
    const [list, total] = await this.repository.findAndCount(query);
    return { list, total };
  }

  findAndCount(options?: FindManyOptions<T>): Promise<[T[], number]> {
    return this.repository.findAndCount(options);
  }

  findById(id: string, options?: FindOneOptions<T>): Promise<T> {
    return this.repository.findOne(options);
  }

  findByIds(ids: string[]): Promise<T[]> {
    return this.repository.find({ where: { id: In(ids) } as FindOptionsWhere<T> });
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


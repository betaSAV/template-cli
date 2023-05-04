---
to: <%= cwd %>/<%=project%>/src/persistence/base.persistence.spec.ts
unless_exists: true
---
import { Injectable } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import {
  FindOptions,
  FindManyOptions,
  FindOneOptions,
  In,
  RemoveOptions,
  Repository,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { BasePersistence } from './base.persistence';

describe('BasePersistence', () => {
  @Injectable()
  class DummyPersistenceService extends BasePersistence<BaseEntity> {
    constructor(
      @InjectRepository(BaseEntity)
      protected readonly repository: Repository<BaseEntity>,
    ) {
      super();
    }
  }

  type MockType<T> = {
    [P in keyof T]?: jest.Mock<{}>;
  };

  let dummyService: DummyPersistenceService;
  let repositoryMock: MockType<Repository<BaseEntity>>;
  const author = 'test@test.com';

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DummyPersistenceService,
        {
          provide: getRepositoryToken(BaseEntity),
          useFactory: jest.fn(() => ({
            find: jest.fn(),
            findOne: jest.fn(),
            findByIds: jest.fn(),
            findAndCount: jest.fn(),
            remove: jest.fn(),
            delete: jest.fn(),
            save: jest.fn(),
            count: jest.fn(),
          })),
        },
      ],
    }).compile();

    dummyService = moduleRef.get<DummyPersistenceService>(
      DummyPersistenceService,
    );
    repositoryMock = moduleRef.get(getRepositoryToken(BaseEntity));
  });

  describe('find', () => {
    it('should call repository find with correct options', async () => {
      let options = { where: { name: 'test' } } as FindManyOptions<BaseEntity>;
      await dummyService.find(options);
      expect(repositoryMock.find).toHaveBeenCalledWith(options);
    });
  });

  describe('findOne', () => {
    it('should call repository findOne with correct options', async () => {
      let options = { where: { name: 'test' } } as FindOneOptions<BaseEntity>;
      await dummyService.findOne(options);
      expect(repositoryMock.findOne).toHaveBeenCalledWith(options);
    });
  });

  describe('findAll', () => {
    it('should call repository find with correct options', async () => {
      let options = { where: { name: 'test' } } as FindManyOptions<BaseEntity>;
      await dummyService.findAll(options);
      expect(repositoryMock.find).toHaveBeenCalledWith(options);
    });
  });

  describe('findPaginated', () => {
    it('should call repository findAndCount with correct options', async () => {
      const paginationParams = { page: 1, limit: 10 };
      let options = { where: { name: 'test' } } as FindManyOptions<BaseEntity>;
      await dummyService.findPaginated(paginationParams, options);
      expect(repositoryMock.findAndCount).toHaveBeenCalledWith({
        ...options,
        skip: 0,
        take: 10,
      });
    });
  });

  describe('findAndCount', () => {
    it('should call repository findAndCount with correct options', async () => {
      let options = { where: { name: 'test' } } as FindManyOptions<BaseEntity>;
      await dummyService.findAndCount(options);
      expect(repositoryMock.findAndCount).toHaveBeenCalledWith(options);
    });
  });

  describe('findById', () => {
    it('should call repository findOne with correct id & options', async () => {
      let id = 'id';
      let options = { id: id, where: { name: 'test' } } as FindOneOptions<BaseEntity>;
      await dummyService.findById(id, options);
      expect(repositoryMock.findOne).toHaveBeenCalledWith(options);
    });
  });

  describe('findByIds', () => {
    it('should call repository find with correct options', async () => {
      const ids = ['id1', 'id2'];
      await dummyService.findByIds(ids);
      expect(repositoryMock.find).toHaveBeenCalledWith({
        where: { id: In(ids) },
      });
    });
  });

  describe('deleteEntity', () => {
    it('should call repository deleteEntity with correct id & options', async () => {
      let entity = { id: 'id' } as BaseEntity;
      let options = { where: { name: 'test' } } as RemoveOptions;
      await dummyService.deleteEntity(entity, options);
      expect(repositoryMock.remove).toHaveBeenCalledWith(entity, options);
    });
  });

  describe('deleteById', () => {
    it('should call repository delete with correct id & options', async () => {
      let id = 'id';
      await dummyService.deleteById(id);
      expect(repositoryMock.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('insert', () => {
    it('should call repository save with correct fields in entity', async () => {
      jest
        .spyOn(repositoryMock, 'save')
        .mockImplementation(async (entity) => entity);
      const entity = { id: 'id' } as BaseEntity;
      const savedEntity = await dummyService.insert(entity, author);
      expect(repositoryMock.save).toHaveBeenCalled();
      expect(savedEntity).toHaveProperty('createdBy', author);
      expect(savedEntity).toHaveProperty('lastChangedBy', author);
    });
  });

  describe('save', () => {
    it('should call repository save with correct fields in entity and just change lastChangedBy', async () => {
      jest
        .spyOn(repositoryMock, 'save')
        .mockImplementation(async (entity) => entity);
      const entity = {
        id: 'id',
        createdBy: 'anotheruser@test.com',
      } as BaseEntity;
      const savedEntity = await dummyService.save(entity, author);
      expect(repositoryMock.save).toHaveBeenCalled();
      expect(savedEntity).toHaveProperty('createdBy', entity.createdBy);
      expect(savedEntity).toHaveProperty('lastChangedBy', author);
    });
  });

  describe('count', () => {
    it('should call repository count with correct options', async () => {
      let options = { where: { name: 'test' } } as FindManyOptions<BaseEntity>;
      await dummyService.count(options);
      expect(repositoryMock.count).toHaveBeenCalledWith(options);
    });
  });
});
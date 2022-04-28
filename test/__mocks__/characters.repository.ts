import { getRepositoryToken } from '@nestjs/typeorm';
import { EntitySchemaOptions } from 'typeorm/entity-schema/EntitySchemaOptions';
import { characterStub } from '../stubs/character.stub';
import { Character } from '../../src/characters/entities/character.entity';

export const CharactersRepositoryMock = {
  provide: getRepositoryToken(Character),
  options: {} as EntitySchemaOptions<any>,
  useFactory: () => ({
    findOne: jest.fn(() => characterStub()),
    save: jest.fn(() => characterStub()),
    find: jest.fn(() => [characterStub()]),
    remove: jest.fn(() => characterStub()),
  }),
};

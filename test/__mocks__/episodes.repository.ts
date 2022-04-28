import { episodeStub } from '../stubs/episode.stub';

import { Episode } from '../../src/episodes/entities/episode.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntitySchemaOptions } from 'typeorm/entity-schema/EntitySchemaOptions';

export const EpisodesRepositoryMock = {
  provide: getRepositoryToken(Episode),
  options: {} as EntitySchemaOptions<any>,
  useFactory: () => ({
    findOne: jest.fn(() => episodeStub()),
    save: jest.fn(() => episodeStub()),
    find: jest.fn(() => [episodeStub()]),
    remove: jest.fn(() => episodeStub()),
  }),
};

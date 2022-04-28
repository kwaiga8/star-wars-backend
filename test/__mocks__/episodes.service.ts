import { EpisodesService } from '../../src/episodes/episodes.service';
import { episodeStub } from '../stubs/episode.stub';
import { baseEpisodeStub } from '../stubs/base-episode.stub';

export const EpisodesServiceMock = {
  provide: EpisodesService,
  useFactory: () => ({
    create: jest.fn(() => episodeStub()),
    findAll: jest.fn(() => [baseEpisodeStub()]),
    findOneById: jest.fn(() => episodeStub()),
    update: jest.fn(() => episodeStub()),
    remove: jest.fn(() => episodeStub()),
  }),
};

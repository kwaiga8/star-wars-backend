import { CharactersService } from '../../src/characters/characters.service';
import { characterStub } from '../stubs/character.stub';
import { paginateStub } from '../stubs/paginate.stub';
import { baseEpisodeStub } from '../stubs/base-episode.stub';
import { episodeStub } from '../stubs/episode.stub';

export const CharacterServiceMock = {
  provide: CharactersService,
  useFactory: () => ({
    findOneById: jest.fn(() => characterStub()),
    create: jest.fn(() => characterStub()),
    paginate: jest.fn(() => paginateStub()),
    findWithEpisodes: jest.fn(() => [characterStub()]),
    update: jest.fn(() => characterStub()),
    remove: jest.fn(() => characterStub()),
    findOneWithEpisodes: jest.fn(() => [baseEpisodeStub()]),
    findOneWithEpisode: jest.fn(() => episodeStub()),
    addEpisodeToCharacter: jest.fn(() => characterStub()),
  }),
};

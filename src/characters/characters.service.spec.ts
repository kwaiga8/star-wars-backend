import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from './characters.service';
import { CharactersRepositoryMock } from '../../test/__mocks__/characters.repository';
import { Repository } from 'typeorm';
import { Character } from './entities/character.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { characterStub } from '../../test/stubs/character.stub';
import { EpisodesService } from '../episodes/episodes.service';
import { EpisodesServiceMock } from '../../test/__mocks__/episodes.service';

describe('CharactersService', () => {
  let service: CharactersService;
  let episodesService: EpisodesService;
  let charactersRepository: Repository<Character>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharactersService,
        EpisodesServiceMock,
        CharactersRepositoryMock,
      ],
    }).compile();

    service = module.get<CharactersService>(CharactersService);
    episodesService = module.get<EpisodesService>(EpisodesService);
    charactersRepository = module.get<Repository<Character>>(
      getRepositoryToken(Character),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Update', () => {
    let updateDto: UpdateCharacterDto;
    it('When update from service is called then save from repository method should be called', async () => {
      await service.update(1, updateDto);
      expect(charactersRepository.save).toHaveBeenCalled();
    });

    it('When update from service is called with any argument then I should retrieve what I hardcoded in repository mock', async () => {
      expect(await service.update(3, updateDto)).toStrictEqual(characterStub());
    });
  });
});

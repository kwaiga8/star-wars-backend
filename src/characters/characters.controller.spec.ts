import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { Character } from './entities/character.entity';
import { Test } from '@nestjs/testing';
import { CharacterServiceMock } from '../../test/__mocks__/characters.service';
import { characterStub } from '../../test/stubs/character.stub';
import { CreateCharacterDto } from './dto/create-character.dto';
import { paginateStub } from '../../test/stubs/paginate.stub';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { baseEpisodeStub } from '../../test/stubs/base-episode.stub';
import { episodeStub } from '../../test/stubs/episode.stub';

describe('CharactersController', () => {
  let charactersService: CharactersService;
  let charactersController: CharactersController;
  const testCharacter: Character = characterStub();

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CharactersController],
      providers: [CharacterServiceMock],
    }).compile();

    charactersService = module.get<CharactersService>(CharactersService);
    charactersController =
      module.get<CharactersController>(CharactersController);
  });

  describe('FindOne', () => {
    it('When findOne from controller is called then findOne from service should be called', async () => {
      charactersController.findOne(1);
      expect(charactersService.findOneById).toHaveBeenCalled();
    });

    it('When findOne from controller is called with any argument then I should retrieve what I hardcoded in charactersService mock', async () => {
      expect(await charactersController.findOne(1)).toStrictEqual(
        testCharacter,
      );
    });

    it('When  findOne from service is called with given argument (but different!) then I should also retrieve what I defined in mock', async () => {
      expect(charactersService.findOneById(2)).toStrictEqual(testCharacter);
    });
  });

  describe('Create', () => {
    let createCharacterDto: CreateCharacterDto;
    it('When create is called then it should call characters service', async () => {
      await charactersController.create(createCharacterDto);
      expect(charactersService.create).toHaveBeenCalled();
    });
    it('When findOne is called from service with given argument then I should retrieve what I defined in mock', async () => {
      expect(charactersService.create(createCharacterDto)).toStrictEqual(
        testCharacter,
      );
    });

    it('When create from controller is called with any argument then I should retrieve what I hardcoded in charactersService mock', async () => {
      expect(
        await charactersController.create(createCharacterDto),
      ).toStrictEqual(testCharacter);
    });
  });

  describe('GetIndexedCharacters', () => {
    let paginateOptions: IPaginationOptions;
    it('When getIndexedCharacters is called then it should call characters service', async () => {
      await charactersController.getIndexedCharacters();
      expect(charactersService.paginate).toBeCalledTimes(1);
    });
    it('When paginate from service with given argument then it should also retrieve what I defined in mock', async () => {
      expect(charactersService.paginate(paginateOptions)).toStrictEqual(
        paginateStub(),
      );
    });

    it('When getIndexedCharacters from controller with any argument is called then I should retrieve what I hardcoded in charactersService mock', async () => {
      expect(await charactersController.getIndexedCharacters()).toStrictEqual(
        paginateStub(),
      );
    });
  });

  describe('FindWithEpisodes', () => {
    it('When findWithEpisodes is called then it should call characters service', async () => {
      await charactersController.findWithEpisodes();
      expect(charactersService.findWithEpisodes).toHaveBeenCalled();
    });
    it('When findWithEpisodes from service with given argument then it should also retrieve what I defined in mock', async () => {
      expect(charactersService.findWithEpisodes()).toStrictEqual([
        testCharacter,
      ]);
    });

    it('When findWithEpisodes from controller with any argument is called then I should retrieve what I hardcoded in charactersService mock', async () => {
      expect(await charactersController.findWithEpisodes()).toStrictEqual([
        testCharacter,
      ]);
    });
  });

  describe('Update', () => {
    let updateCharacterDto: UpdateCharacterDto;
    it('When update is called then it should call characters service', async () => {
      await charactersController.update(33, updateCharacterDto);
      expect(charactersService.update).toHaveBeenCalled();
    });
    it('When update from service with given argument then it should also retrieve what I defined in mock', async () => {
      expect(charactersService.update(2, updateCharacterDto)).toStrictEqual(
        testCharacter,
      );
    });

    it('When update from controller with any argument is called then I should retrieve what I hardcoded in charactersService mock', async () => {
      expect(
        await charactersController.update(45, updateCharacterDto),
      ).toStrictEqual(testCharacter);
    });
  });

  describe('Remove', () => {
    it('When remove is called then it should call characters service', async () => {
      await charactersController.remove(37);
      expect(charactersService.remove).toHaveBeenCalled();
    });
    it('When remove from service with given argument then it should also retrieve what I defined in mock', async () => {
      expect(charactersService.remove(2)).toStrictEqual(testCharacter);
    });

    it('When remove from controller with any argument is called then I should retrieve what I hardcoded in charactersService mock', async () => {
      expect(await charactersController.remove(4)).toStrictEqual(testCharacter);
    });
  });

  describe('FindOneWithEpisodes', () => {
    it('When findOneWithEpisodes is called then it should call characters service', async () => {
      await charactersController.findOneWithEpisodes(7);
      expect(charactersService.findOneWithEpisodes).toHaveBeenCalled();
    });
    it('When findOneWithEpisodes from service with given argument then it should also retrieve what I defined in mock', async () => {
      expect(charactersService.findOneWithEpisodes(2)).toStrictEqual([
        baseEpisodeStub(),
      ]);
    });

    it('When findOneWithEpisodes from controller with any argument is called then I should retrieve what I hardcoded in charactersService mock', async () => {
      expect(await charactersController.findOneWithEpisodes(2)).toStrictEqual([
        baseEpisodeStub(),
      ]);
    });
  });

  describe('FindOneWithEpisode', () => {
    it('When findOneWithEpisode is called then it should call characters service', async () => {
      await charactersController.findOneWithEpisode(11, 7);
      expect(charactersService.findOneWithEpisode).toHaveBeenCalled();
    });
    it('When findOneWithEpisode from service with given argument then it should also retrieve what I defined in mock', async () => {
      expect(charactersService.findOneWithEpisode(1111, 2)).toStrictEqual(
        episodeStub(),
      );
    });

    it('When findOneWithEpisode from controller with any argument is called then I should retrieve what I hardcoded in charactersService mock', async () => {
      expect(
        await charactersController.findOneWithEpisode(12, 14),
      ).toStrictEqual(episodeStub());
    });
  });

  describe('AddEpisodeToCharacter', () => {
    it('When addEpisodeToCharacter is called then it should call characters service', async () => {
      await charactersController.addEpisodeToCharacter(11, 7);
      expect(charactersService.addEpisodeToCharacter).toHaveBeenCalled();
    });
    it('When addEpisodeToCharacter from service with given argument then it should also retrieve what I defined in mock', async () => {
      expect(charactersService.addEpisodeToCharacter(1111, 2)).toStrictEqual(
        testCharacter,
      );
    });

    it('When addEpisodeToCharacter from controller with any argument is called then I should retrieve what I hardcoded in charactersService mock', async () => {
      expect(
        await charactersController.addEpisodeToCharacter(12, 14),
      ).toStrictEqual(testCharacter);
    });
  });
});

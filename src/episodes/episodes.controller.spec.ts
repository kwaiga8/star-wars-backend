import { Test } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { EpisodesServiceMock } from '../../test/__mocks__/episodes.service';
import { episodeStub } from '../../test/stubs/episode.stub';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { baseEpisodeStub } from '../../test/stubs/base-episode.stub';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

describe('EpisodesController', () => {
  let episodesService: EpisodesService;
  let episodesController: EpisodesController;
  const testEpisode = episodeStub();

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [EpisodesController],
      providers: [EpisodesServiceMock],
    }).compile();

    episodesService = module.get<EpisodesService>(EpisodesService);
    episodesController = module.get<EpisodesController>(EpisodesController);
  });

  describe('Create', () => {
    let createEpisodeDto: CreateEpisodeDto;
    it('When create is called then it should call episodes service', async () => {
      await episodesController.create(createEpisodeDto);
      expect(episodesService.create).toHaveBeenCalled();
    });
    it('When create is called from service with given argument then I should retrieve episode', async () => {
      expect(episodesService.create(createEpisodeDto)).toStrictEqual(
        testEpisode,
      );
    });

    it('When create from controller is called with any argument then I should retrieve episode', async () => {
      expect(await episodesController.create(createEpisodeDto)).toStrictEqual(
        testEpisode,
      );
    });
  });

  describe('FindAll', () => {
    it('When findAll is called then it should call episodes service', async () => {
      await episodesController.findAll();
      expect(episodesService.findAll).toHaveBeenCalled();
    });
    it('When findAll is called from service with given argument then I should retrieve episode', async () => {
      expect(episodesService.findAll()).toStrictEqual([baseEpisodeStub()]);
    });
    it('When findAll from controller is called with any argument then I should retrieve episode', async () => {
      expect(await episodesController.findAll()).toStrictEqual([
        baseEpisodeStub(),
      ]);
    });
  });

  describe('FindOneById', () => {
    it('When findOne is called then it should call episodes service', async () => {
      await episodesController.findOne(3);
      expect(episodesService.findOneById).toHaveBeenCalled();
    });
    it('When findOne is called from service with given argument then I should retrieve episode', async () => {
      expect(episodesService.findOneById(11)).toStrictEqual(testEpisode);
    });

    it('When findOne from controller is called with any argument then I should retrieve episode', async () => {
      expect(await episodesController.findOne(3)).toStrictEqual(testEpisode);
    });
  });

  describe('UpdateEpisodeDto', () => {
    let updateEpisodeDto: UpdateEpisodeDto;
    it('When update is called then it should call episodes service', async () => {
      await episodesController.update(2, updateEpisodeDto);
      expect(episodesService.update).toHaveBeenCalled();
    });
    it('When update is called from service with given argument then I should retrieve episode', async () => {
      expect(episodesService.update(123, updateEpisodeDto)).toStrictEqual(
        testEpisode,
      );
    });

    it('When update from controller is called with any argument then I should retrieve episode', async () => {
      expect(
        await episodesController.update(227, updateEpisodeDto),
      ).toStrictEqual(testEpisode);
    });
  });

  describe('Remove', () => {
    it('When remove is called then it should call episodes service', async () => {
      await episodesController.remove(3);
      expect(episodesService.remove).toHaveBeenCalled();
    });
    it('When remove is called from service with given argument then I should retrieve episode', async () => {
      expect(episodesService.remove(11)).toStrictEqual(testEpisode);
    });

    it('When remove from controller is called with any argument then I should retrieve episode', async () => {
      expect(await episodesController.remove(3)).toStrictEqual(testEpisode);
    });
  });
});

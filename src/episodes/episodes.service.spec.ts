import { Test } from '@nestjs/testing';
import { EpisodesService } from './episodes.service';

import { Repository } from 'typeorm';
import { Episode } from './entities/episode.entity';
import { EpisodesRepositoryMock } from '../../test/__mocks__/episodes.repository';
import { episodeStub } from '../../test/stubs/episode.stub';
import { getRepositoryToken } from '@nestjs/typeorm';
import { baseEpisodeStub } from '../../test/stubs/base-episode.stub';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

describe('EpisodesService', () => {
  let episodesService: EpisodesService;
  let episodesRepository: Repository<Episode>;
  const testEpisode = episodeStub();

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [EpisodesService, EpisodesRepositoryMock],
    }).compile();

    episodesService = module.get<EpisodesService>(EpisodesService);
    episodesRepository = module.get<Repository<Episode>>(
      getRepositoryToken(Episode),
    );
  });

  describe('findAll', () => {
    it('When findAll from service is called then find from repository should be called', async () => {
      await episodesService.findAll();
      expect(episodesRepository.find).toHaveBeenCalled();
    });

    it('When findAll from service is called with any argument then I should retrieve what I hardcoded in repository mock', async () => {
      expect(await episodesService.findAll()).toStrictEqual([
        baseEpisodeStub(),
      ]);
    });
  });

  describe('Update', () => {
    let updateEpisodeDto: UpdateEpisodeDto;
    it('When update from service is called then save from repository method should be called', async () => {
      await episodesService.update(1, updateEpisodeDto);
      expect(episodesRepository.save).toHaveBeenCalled();
    });

    it('When update from service is called with any argument then I should retrieve what I hardcoded in repository mock', async () => {
      expect(await episodesService.update(3, updateEpisodeDto)).toStrictEqual(
        testEpisode,
      );
    });
  });
});

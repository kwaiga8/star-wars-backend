import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasicEpisode, Episode } from './entities/episode.entity';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episode)
    private readonly episodeRepository: Repository<Episode>,
  ) {}

  async create(createEpisodeDto: CreateEpisodeDto): Promise<Episode> {
    const episodeByName: Episode = await this.episodeRepository.findOne({
      name: createEpisodeDto.name,
    });
    if (episodeByName) {
      throw new HttpException(
        'This movie episode already exist, try with another one',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newEpisode = new Episode();
    Object.assign(newEpisode, createEpisodeDto);
    return await this.episodeRepository.save(newEpisode);
  }

  async findAll(): Promise<BasicEpisode[]> {
    const episodes: Episode[] = await this.episodeRepository.find();
    return episodes.reduce(
      (e, episode) => [...e, { name: episode.name, id: episode.id }],
      [],
    );
  }

  async findOneById(id: number): Promise<Episode> {
    const episode = await this.episodeRepository.findOne(id);
    if (!episode) {
      throw new HttpException(
        'Episode ID does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    return episode;
  }

  async update(
    id: number,
    updateEpisodeDto: UpdateEpisodeDto,
  ): Promise<Episode> {
    const episode = await this.findOneById(id);
    Object.assign(episode, updateEpisodeDto);
    return await this.episodeRepository.save(episode);
  }

  async remove(id: number): Promise<Episode> {
    const episode = await this.findOneById(id);
    return await this.episodeRepository.remove(episode);
  }

  async removeAll(): Promise<void> {
    const episodes: Episode[] = await this.episodeRepository.find();
    for (const values of episodes) {
      await this.remove(values.id);
    }
  }
}

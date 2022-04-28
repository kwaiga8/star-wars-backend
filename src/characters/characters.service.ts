import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BasicEpisode, Episode } from '../episodes/entities/episode.entity';
import { EpisodesService } from '../episodes/episodes.service';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { paginate } from 'nestjs-typeorm-paginate';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    private readonly episodesService: EpisodesService,
  ) {}

  async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
    const characterByName = await this.characterRepository.findOne({
      name: createCharacterDto.name,
    });
    if (characterByName) {
      throw new HttpException(
        'This character already exist, try with another one',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newCharacter = new Character();
    Object.assign(newCharacter, createCharacterDto);

    return await this.characterRepository.save(newCharacter);
  }

  async findWithEpisodes(): Promise<Character[]> {
    const allCharactersWithAllEpisodes: Character[] =
      await this.characterRepository
        .createQueryBuilder('characters')
        .leftJoinAndSelect('characters.episodes', 'episodes')
        .select(['characters.name', 'characters.race', 'episodes.name'])
        .getMany();

    function reduceEpisodes(element: Episode[]): any[] {
      return element.reduce(
        (element, episode) => [...element, episode.name],
        [],
      );
    }

    const charactersWithEpisodesTiltles = allCharactersWithAllEpisodes.map(
      (element) => {
        return {
          ...element,
          episodes: reduceEpisodes(element.episodes),
        };
      },
    );

    return charactersWithEpisodesTiltles;
  }

  async findAll(): Promise<Character[]> {
    return await this.characterRepository.find();
  }

  async findOneById(id: number): Promise<Character> {
    const character = await this.characterRepository.findOne(id);
    if (!character) {
      throw new HttpException(
        'Character ID does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    return character;
  }

  async update(
    id: number,
    updateCharacterDto: UpdateCharacterDto,
  ): Promise<Character> {
    const character = await this.findOneById(id);
    Object.assign(character, updateCharacterDto);
    return await this.characterRepository.save(character);
  }

  async remove(id: number): Promise<Character> {
    const character = await this.findOneById(id);
    return await this.characterRepository.remove(character);
  }

  async findOneWithEpisodesDetails(id: number): Promise<Episode[]> {
    const character = await this.characterRepository.findOne(id, {
      relations: ['episodes'],
    });
    if (!character) {
      throw new HttpException(
        'Character ID does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    return character.episodes;
  }

  async findOneWithEpisode(
    characterId: number,
    episodeId: number,
  ): Promise<Episode> {
    const characterEpisodes: Episode[] = await this.findOneWithEpisodesDetails(
      characterId,
    );
    const episode: Episode = characterEpisodes.find((e) => e.id === episodeId);

    if (!episode) {
      throw new HttpException(
        'Episode ID does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    return episode;
  }

  async findOneWithEpisodes(id: number): Promise<BasicEpisode[]> {
    const characterEpisodesDetails: Episode[] =
      await this.findOneWithEpisodesDetails(id);
    return characterEpisodesDetails.reduce(
      (element, episode) => [
        ...element,
        { name: episode.name, id: episode.id },
      ],
      [],
    );
  }

  async addEpisodeToCharacter(
    characterId: number,
    episodeId: number,
  ): Promise<Character> {
    const characterToUpdate: Character = await this.findOneById(characterId);
    const episode: Episode = await this.episodesService.findOneById(episodeId);
    const arrayOfExistingEpisodes: Episode[] =
      await this.findOneWithEpisodesDetails(characterId);

    const contains = arrayOfExistingEpisodes.some((e) => e.id === episodeId);
    if (contains) {
      throw new HttpException(
        'This episode is already assign to character',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      const arrayOfEpisodes: Episode[] = [];
      arrayOfEpisodes.push(...arrayOfExistingEpisodes, episode);
      characterToUpdate.episodes = arrayOfEpisodes;
      return await this.characterRepository.save(characterToUpdate);
    }
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Character>> {
    const queryBuilder = this.characterRepository
      .createQueryBuilder('characters')
      .select(['characters.name', 'characters.id']);
    return paginate<Character>(queryBuilder, options);
  }

  async removeAll(): Promise<void> {
    const characters: Character[] = await this.characterRepository.find();
    for (const values of characters) {
      await this.remove(values.id);
    }
  }
}

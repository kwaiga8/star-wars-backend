import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Episode } from '../episodes/entities/episode.entity';
import { EpisodesService } from '../episodes/episodes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Character]),
    TypeOrmModule.forFeature([Episode]),
  ],
  controllers: [CharactersController],
  providers: [CharactersService, EpisodesService],
})
export class CharactersModule {}

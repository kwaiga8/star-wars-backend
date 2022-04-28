import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharactersModule } from './characters/characters.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodesModule } from './episodes/episodes.module';
import ormconfig from './ormconfig';

@Module({
  imports: [CharactersModule, TypeOrmModule.forRoot(ormconfig), EpisodesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

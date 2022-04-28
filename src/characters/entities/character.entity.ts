// eslint-disable-next-line
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Episode } from '../../episodes/entities/episode.entity';
import { PartialType } from '@nestjs/mapped-types';

@Entity({ name: 'characters' })
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  race: string;

  @ManyToMany((type) => Episode, (episode) => episode.name, {})
  @ApiProperty()
  @JoinTable({ name: 'episodeNames' })
  episodes?: Episode[];
}

export class BasicCharacter extends PartialType(Character) {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

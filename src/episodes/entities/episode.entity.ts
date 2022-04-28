import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';

@Entity({ name: 'episodes' })
export class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  productionYear: number;
}

export class BasicEpisode extends PartialType(Episode) {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

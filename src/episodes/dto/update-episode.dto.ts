import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEpisodeDto } from './create-episode.dto';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UpdateEpisodeDto extends PartialType(CreateEpisodeDto) {
  @ApiProperty()
  @MinLength(1)
  @MaxLength(50)
  @IsNotEmpty()
  name: string;
}

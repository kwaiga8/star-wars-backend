import { PartialType } from '@nestjs/mapped-types';
import { CreateCharacterDto } from './create-character.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {
  @ApiProperty()
  @MinLength(1)
  @MaxLength(50)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @MinLength(1)
  @MaxLength(50)
  @IsNotEmpty()
  race: string;
}

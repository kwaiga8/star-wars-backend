import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateCharacterDto {
  @ApiProperty()
  @MinLength(1)
  @MaxLength(50)
  @IsNotEmpty()
  name: string;

  @MinLength(1)
  @MaxLength(50)
  @ApiProperty()
  @IsNotEmpty()
  race: string;
}

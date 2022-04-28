import { ApiProperty } from '@nestjs/swagger';
// eslint-disable-next-line
import { IsInt, IsNotEmpty, Max, MaxLength, Min, MinLength} from 'class-validator';

export class CreateEpisodeDto {
  @ApiProperty()
  @MinLength(1)
  @MaxLength(50)
  @IsNotEmpty()
  name: string;

  @ApiProperty({example:2000})
  @IsInt()
  @Min(1977)
  @Max(2999)
  productionYear: number;
}

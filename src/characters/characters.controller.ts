// eslint-disable-next-line
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, DefaultValuePipe, UsePipes } from '@nestjs/common';
// eslint-disable-next-line
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnprocessableEntityResponse, ApiQuery} from '@nestjs/swagger';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { BasicCharacter, Character } from './entities/character.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { BasicEpisode, Episode } from '../episodes/entities/episode.entity';
import { PositiveIntPipe } from '../pipes/positive-int-pipe';

@ApiTags('STAR WARS CHARACTERS')
@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Created!' })
  @ApiBadRequestResponse()
  @ApiUnprocessableEntityResponse()
  create(@Body() createCharacterDto: CreateCharacterDto): Promise<Character> {
    return this.charactersService.create(createCharacterDto);
  }

  @Get()
  @ApiOkResponse({ type: [BasicCharacter] })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Max limit is 20',
  })
  @UsePipes(new PositiveIntPipe())
  async getIndexedCharacters(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe, PositiveIntPipe)
    page = 1,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe, PositiveIntPipe)
    limit = 20,
  ): Promise<Pagination<BasicCharacter>> {
    limit = Math.min(limit, 20);
    return this.charactersService.paginate({
      page,
      limit,
    });
  }

  @Get('details')
  @ApiOkResponse({ type: [Character] })
  findWithEpisodes(): Promise<Character[]> {
    return this.charactersService.findWithEpisodes();
  }

  @Get(':id')
  @ApiOkResponse({ type: Character })
  @ApiBadRequestResponse()
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Character> {
    return this.charactersService.findOneById(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 204, description: 'Resource updated successfully' })
  @ApiBadRequestResponse()
  update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ): Promise<Character> {
    return this.charactersService.update(+id, updateCharacterDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Resource deleted successfully' })
  @ApiBadRequestResponse()
  remove(@Param('id', ParseIntPipe) id: number): Promise<Character> {
    return this.charactersService.remove(+id);
  }

  @Get(':characterId/episodes')
  @ApiResponse({ type: [BasicEpisode] })
  @ApiBadRequestResponse()
  findOneWithEpisodes(
    @Param('characterId', ParseIntPipe) characterId: number,
  ): Promise<BasicEpisode[]> {
    return this.charactersService.findOneWithEpisodes(+characterId);
  }

  @Get(':characterId/episodes/:episodeId')
  @ApiResponse({ type: Episode })
  @ApiBadRequestResponse()
  findOneWithEpisode(
    @Param('characterId', ParseIntPipe) characterId: number,
    @Param('episodeId', ParseIntPipe) episodeId: number,
  ): Promise<Episode> {
    return this.charactersService.findOneWithEpisode(characterId, episodeId);
  }

  @Post(':characterId/episodes/:episodeId')
  @ApiCreatedResponse({ description: 'Added!' })
  @ApiBadRequestResponse()
  @ApiUnprocessableEntityResponse()
  addEpisodeToCharacter(
    @Param('characterId', ParseIntPipe) characterId: number,
    @Param('episodeId', ParseIntPipe) episodeId: number,
  ): Promise<Character> {
    return this.charactersService.addEpisodeToCharacter(characterId, episodeId);
  }
}

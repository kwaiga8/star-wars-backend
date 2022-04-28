// eslint-disable-next-line
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes } from '@nestjs/common';
// eslint-disable-next-line
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnprocessableEntityResponse, } from '@nestjs/swagger';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { BasicEpisode, Episode } from './entities/episode.entity';
import { UpperCasePipe } from '../pipes/upper-case.pipe';

@ApiTags('STAR WARS EPISODES')
@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Created!' })
  @ApiBadRequestResponse()
  @ApiUnprocessableEntityResponse()
  @UsePipes(new UpperCasePipe())
  create(@Body() createEpisodeDto: CreateEpisodeDto): Promise<Episode> {
    return this.episodesService.create(createEpisodeDto);
  }

  @Get()
  @ApiOkResponse({ type: [BasicEpisode] })
  findAll(): Promise<BasicEpisode[]> {
    return this.episodesService.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: Episode })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Episode> {
    return this.episodesService.findOneById(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 204, description: 'Episode updated successfully' })
  @ApiBadRequestResponse()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEpisodeDto: UpdateEpisodeDto,
  ): Promise<Episode> {
    return this.episodesService.update(+id, updateEpisodeDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Episode deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Episode> {
    return this.episodesService.remove(+id);
  }
}

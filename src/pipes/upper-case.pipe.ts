import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateEpisodeDto } from '../episodes/dto/create-episode.dto';

@Injectable()
export class UpperCasePipe implements PipeTransform {
  transform(value: CreateEpisodeDto, metadata: ArgumentMetadata): any {
    return { ...value, name: value.name.toUpperCase() };
  }
}

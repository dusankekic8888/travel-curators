import { IsNotEmpty, IsNumber } from 'class-validator';
import { TourCreateDto } from '../tourCreate.dto';

export class TourToDBDto extends TourCreateDto {
  @IsNotEmpty()
  @IsNumber()
  createdById: number;
}

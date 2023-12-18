import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { TourDto } from './tour.dto';

export class ResTourDto{

  @ApiProperty({ type: TourDto, isArray: true })
  @IsDefined()
  @IsArray()
  @ValidateNested()
  @Type(() => TourDto)
  tours: TourDto[];

  @ApiProperty({ type: Number, example: 1 })
  @IsNotEmpty()
  count: number;

}

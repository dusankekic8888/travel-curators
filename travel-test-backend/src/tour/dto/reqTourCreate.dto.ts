import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TourCreateDto } from '@app/tour/dto/tourCreate.dto';

export class ReqTourCreateDto {
  @ApiProperty({ type: TourCreateDto })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => TourCreateDto)
  tour: TourCreateDto;
}

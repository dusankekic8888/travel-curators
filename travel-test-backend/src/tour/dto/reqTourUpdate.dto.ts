import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TourUpdateDto } from './tourUpdate.dto';

export class ReqTourUpdateDto {
  @ApiProperty({ type: TourUpdateDto })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => TourUpdateDto)
  tour: TourUpdateDto;
}

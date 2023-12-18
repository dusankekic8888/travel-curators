import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { BookingDto } from './booking.dto';

export class ResBookingDto{

  @ApiProperty({ type: BookingDto, isArray: true })
  @IsDefined()
  @IsArray()
  @ValidateNested()
  @Type(() => BookingDto)
  bookings: BookingDto[];

  @ApiProperty({ type: Number, example: 1 })
  @IsNotEmpty()
  count: number;

}

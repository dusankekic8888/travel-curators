import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BookingCreateDto } from '@app/booking/dto/bookingCreate.dto';

export class ReqBookingCreateDto {
  @ApiProperty({ type: BookingCreateDto })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => BookingCreateDto)
  booking: BookingCreateDto;
}

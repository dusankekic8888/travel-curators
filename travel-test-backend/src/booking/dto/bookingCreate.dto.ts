import { IsDefined, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, ValidateNested } from 'class-validator';
import { CustomerCreateDto } from './customerCreate.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class BookingCreateDto {

  @ApiProperty({ type: CustomerCreateDto })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CustomerCreateDto)
  customer: CustomerCreateDto;

  @ApiProperty({
    example: 1,
    description: 'Tour Id',
  })
  @IsNotEmpty()
  @IsNumber()
  tourId: number;
  
}


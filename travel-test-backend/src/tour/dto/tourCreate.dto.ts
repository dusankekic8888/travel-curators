import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TourCreateDto {
  @ApiProperty({
    example: 'Title Tour',
    description: 'Title to new tour',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Description Tour',
    description: 'Description to new tour',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 'Thumbnail Tour',
    description: 'Thumbnail to new tour',
  })
  @IsNotEmpty()
  @IsString()
  thumbnail: string;

}

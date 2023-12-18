import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class TourUpdateDto {
  @ApiProperty({
    example: 'Title Tour',
    description: 'Title to new tour',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example: 'Description Tour',
    description: 'Description to new tour',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'Thumbnail Tour',
    description: 'Thumbnail to new tour',
  })
  @IsOptional()
  @IsString()
  thumbnail: string;
}

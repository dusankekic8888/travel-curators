import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserCreateDto } from './userCreate.dto';

export class UserClearDto extends OmitType(UserCreateDto, ['password']) {
  @ApiProperty({
    example: 'role',
    description: 'The role of the User',
  })
  @IsString()
  role: string;

  @ApiProperty({
    example: 'image',
    description: 'The image of the User',
  })
  @IsString()
  image: string;
}

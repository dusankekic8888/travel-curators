import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TourWithRelationEntity } from '../entity/tourWithRelation.entity';
import { UserAuthorEntity } from '@app/user/entity/userAuthor.entity';

export class TourDto implements TourWithRelationEntity{

  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;

  @IsNotEmpty()
  @IsNumber()
  createdById: number;

  @IsNotEmpty()
  createdBy: UserAuthorEntity;

}

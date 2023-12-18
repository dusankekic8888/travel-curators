import { UserAuthorEntity } from '@app/user/entity/userAuthor.entity';
import { TourEntity } from './tour.entity';

export class TourWithRelationEntity extends TourEntity {

  createdBy: UserAuthorEntity;
}

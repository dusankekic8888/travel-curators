import { BookingEntity } from './booking.entity';
import { TourEntity } from '@app/tour/entity/tour.entity';
import { CustomerEntity } from './customer.entity';

export class BookingWithRelationEntity extends BookingEntity {

  customer: CustomerEntity

  tour: TourEntity
}

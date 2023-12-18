import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BookingWithRelationEntity } from '../entity/bookingWithRelation.entity';
import { BookingEntity } from '@app/booking/entity/booking.entity';
import { TourEntity } from '@app/tour/entity/tour.entity';
import { CustomerEntity } from '../entity/customer.entity';

export class BookingDto implements BookingWithRelationEntity{
  customer: CustomerEntity;
  customerId: number;
  tour: TourEntity;
  tourId: number;

  bookingDate: Date;

  @IsNotEmpty()
  @IsNumber()
  id: number;

}

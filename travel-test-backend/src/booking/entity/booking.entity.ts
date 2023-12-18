import { Booking } from '@prisma/client';

export class BookingEntity implements Booking {
  bookingDate: Date;
  id: number;
  customerId: number;
  tourId: number;
 
}

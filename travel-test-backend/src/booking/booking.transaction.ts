import { Transaction } from '@app/common/common.transaction';
import { Tx } from '@app/common/common.type';
import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { BookingCheck } from './booking.check';
import { BookingRepository } from './booking.repository';
import { BookingEntity } from './entity/booking.entity';
import { BookingCreateDto } from './dto/bookingCreate.dto';

@Injectable()
export class BookingTransaction extends Transaction {
  constructor(
    readonly prisma: PrismaService,
    private readonly bookingRepository: BookingRepository,
    private readonly bookingCheck: BookingCheck,
  ) {
    super(prisma);
  }

  async createBookingTransaction(
    bookingCreateDto: BookingCreateDto,
  ): Promise<void> {
    const action = async (tx: Tx): Promise<BookingEntity> => {

      const booking = await this.bookingRepository.createBooking(
        bookingCreateDto,
        tx,
      );

      return booking;
    };

    const booking = await this.start<BookingEntity>(action);

    this.bookingCheck.isCreated(!!booking);
  }

}

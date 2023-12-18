
import { Module } from '@nestjs/common';
import { BookingController } from '@app/booking/booking.controller';
import { BookingService } from '@app/booking/booking.service';
import { UserModule } from '@app/user/user.module';
import { PrismaModule } from '@app/prisma/prisma.module';
import { CommonModule } from '@app/common/common.module';
import { BookingRepository } from './booking.repository';
import { BookingTransaction } from './booking.transaction';
import { BookingCheck } from './booking.check';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    CommonModule,
  ],
  controllers: [BookingController],
  providers: [
    BookingService,
    BookingRepository,
    BookingTransaction,
    BookingCheck,
  ],
})
export class BookingModule {}

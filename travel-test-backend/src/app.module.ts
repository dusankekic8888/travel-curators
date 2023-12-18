import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma/prisma.module';
import { UserModule } from '@app/user/user.module';
import { AuthModule } from '@app/auth/auth.module';
import { TourModule } from '@app/tour/tour.module';
import { BookingModule } from '@app/booking/booking.module';

import { CommonModule } from '@app/common/common.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    TourModule,
    BookingModule,
    CommonModule,
  ],
})
export class AppModule {}

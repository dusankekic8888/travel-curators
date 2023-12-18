import { Module } from '@nestjs/common';
import { TourController } from '@app/tour/tour.controller';
import { TourService } from '@app/tour/tour.service';
import { UserModule } from '@app/user/user.module';
import { PrismaModule } from '@app/prisma/prisma.module';
import { CommonModule } from '@app/common/common.module';
import { TourRepository } from './tour.repository';
import { TourTransaction } from './tour.transaction';
import { TourCheck } from './tour.check';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    CommonModule,
  ],
  controllers: [TourController],
  providers: [
    TourService,
    TourRepository,
    TourTransaction,
    TourCheck,
  ],
})
export class TourModule {}

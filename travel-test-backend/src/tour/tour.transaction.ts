import { Transaction } from '@app/common/common.transaction';
import { Tx } from '@app/common/common.type';
import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TourCheck } from './tour.check';
import { TourRepository } from './tour.repository';
import { TourToDBDto } from './dto/db/tourToDB.dto';
import { TourEntity } from './entity/tour.entity';

@Injectable()
export class TourTransaction extends Transaction {
  constructor(
    readonly prisma: PrismaService,
    private readonly tourRepository: TourRepository,
    private readonly tourCheck: TourCheck,
  ) {
    super(prisma);
  }

  async createTourTransaction(
    tourToDBDto: TourToDBDto,
  ): Promise<void> {
    const action = async (tx: Tx): Promise<TourEntity> => {

      const tour = await this.tourRepository.createTour(
        tourToDBDto,
        tx,
      );

      return tour;
    };

    const tour = await this.start<TourEntity>(action);

    this.tourCheck.isCreated(!!tour);
  }

  async updateTourTransaction(
    tourToDBDto: TourToDBDto,
    id: number,
  ): Promise<void> {
    const action = async (tx: Tx) => {

      const tour = await this.tourRepository.updateTour(
        tourToDBDto,
        id,
        tx,
      );

      return tour;
    };

    const tour = await this.start<TourEntity>(action);

    this.tourCheck.isUpdated(!!tour);
  }

  async deleteTourTransaction(id: number): Promise<void> {
    const action = async (tx: Tx) => {
      const tour = await this.tourRepository.deleteTourById(id, tx);
    
    };

    await this.start(action);
    const tourDeleted = await this.tourRepository.getTourById(id);
    this.tourCheck.isDeleted(!!tourDeleted);
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { include } from '@app/tour/tour.select';
import { Prisma } from '@prisma/client';
import { TourToDBDto } from '@app/tour/dto/db/tourToDB.dto';
import { TourWithRelationEntity } from './entity/tourWithRelation.entity';
import { TourEntity } from './entity/tour.entity';
import { PayloadInclude } from './tour.type';
import { ITourQueryParamsRequered } from './tour.interface';
import { Tx } from '@app/common/common.type';

@Injectable()
export class TourRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTour(
    data: TourToDBDto,
    prisma: Tx = this.prisma,
  ): Promise<TourEntity> {
    console.log('data', data)
    return await prisma.tour.create({ data });
  }

  async getTourAllByParams(
    queryParams: ITourQueryParamsRequered,
    prisma: Tx = this.prisma,
  ): Promise<TourWithRelationEntity[]> {
    const params = this.prepareQueryParams(queryParams);
    const where = this.prepareWhereParams(queryParams);

    const tours = await prisma.tour.findMany({
      ...params,
      where,
      include,
    });

    return tours;
  }


  async countTours(queryParams: ITourQueryParamsRequered): Promise<number> {
    const where = this.prepareWhereParams(queryParams);
    const count = await this.prisma.tour.count({ where });
    return count;
  }


  async getTourById(
    id: number,
    prisma: Tx = this.prisma,
  ): Promise<TourWithRelationEntity> {
    const tour = await prisma.tour.findUnique({
      where: {
        id,
      },
      include,
    });

    if (!tour) {
      return null;
    }
    return tour;
  }

  async updateTour(
    tourToDBDto: TourToDBDto,
    id: number,
    prisma: Tx = this.prisma,
  ): Promise<PayloadInclude> {
    const tourUpdated: PayloadInclude = await prisma.tour.update({
      where: {
        id: id,
      },
      data: {
        ...tourToDBDto,
      },
      include,
    });

    return tourUpdated;
  }

  async deleteTourById(
    id: number,
    driver: Tx = this.prisma,
  ): Promise<void> {
    await driver.tour.delete({
      where: {
        id,
      },
    });
  }

  private prepareWhereParams(params: any): Prisma.TourWhereInput {
    const { createdBy } = params;
    const where = {
      AND: [],
    };
    if (createdBy) {
      where.AND.push({
        createdBy: {
          username: {
            equals: createdBy,
          },
        },
      });
    }
    return where;
  }

  private prepareQueryParams(parms: any): Prisma.TourFindManyArgs {
    const { offset, limit, orderBy, direction } = parms;
    return {
      take: limit,
      skip: offset,
      orderBy: {
        [orderBy]: direction,
      },
    };
  }
}

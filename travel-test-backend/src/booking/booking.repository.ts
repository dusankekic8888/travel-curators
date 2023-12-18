import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { include } from '@app/booking/booking.select';
import { Prisma } from '@prisma/client';
import { BookingWithRelationEntity } from './entity/bookingWithRelation.entity';
import { BookingEntity } from './entity/booking.entity';
import { IBookingQueryParamsRequered } from './booking.interface';
import { Tx } from '@app/common/common.type';
import { BookingCreateDto } from './dto/bookingCreate.dto';

@Injectable()
export class BookingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createBooking(
    data: BookingCreateDto,
    prisma: Tx = this.prisma,
  ): Promise<BookingEntity> {
    const customer = await prisma.customer.create({data: data.customer});
    return await prisma.booking.create({ data: {tourId: data.tourId, customerId: customer.id, bookingDate: new Date()} });
  }

  async getBookingAllByParams(
    queryParams: IBookingQueryParamsRequered,
    prisma: Tx = this.prisma,
  ): Promise<BookingWithRelationEntity[]> {
    const params = this.prepareQueryParams(queryParams);
    const where = this.prepareWhereParams(queryParams);

    const bookings = await prisma.booking.findMany({
      ...params,
      where,
      include,
    });

    return bookings;
  }

  async countBookings(queryParams: IBookingQueryParamsRequered): Promise<number> {
    const where = this.prepareWhereParams(queryParams);
    const count = await this.prisma.booking.count({ where });
    return count;
  }

  async getBookingById(
    id: number,
    prisma: Tx = this.prisma,
  ): Promise<BookingWithRelationEntity> {
    console.log(typeof(id))
    const booking = await prisma.booking.findUnique({
      where: {
        id,
      },
      include,
    });

    if (!booking) {
      return null;
    }
    return booking;
  }


  private prepareWhereParams(params: any): Prisma.BookingWhereInput {
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

  private prepareQueryParams(parms: any): Prisma.BookingFindManyArgs {
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

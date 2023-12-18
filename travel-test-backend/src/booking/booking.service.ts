import { Injectable } from '@nestjs/common';
import { CommonService } from '@app/common/common.service';
import { UserService } from '@app/user/user.service';
import { BookingRepository } from '@app/booking/booking.repository';
import { IBookingQueryParamsRequered } from '@app/booking/booking.interface';
import { BookingTransaction } from '@app/booking/booking.transaction';
import { BookingCheck } from '@app/booking/booking.check';
import { Token } from '@app/auth/iterface/auth.interface';
import { BookingWithRelationEntity } from '@app/booking/entity/bookingWithRelation.entity';
import { ResBookingDto } from '@app/booking/dto/resBooking.dto';
import { BookingCreateDto } from '@app/booking/dto/bookingCreate.dto';
import { BookingDto } from './dto/booking.dto';

@Injectable()
export class BookingService {
  constructor(
    private readonly commonService: CommonService,
    private readonly userService: UserService,
    private readonly bookingRepository: BookingRepository,
    private readonly bookingTransaction: BookingTransaction,
    private readonly bookingCheck: BookingCheck,
  ) {}

  async getBookingAllByParams(
    queryParams: IBookingQueryParamsRequered,
  ): Promise<ResBookingDto> {
    const [bookings, bookingCount] = await this.getBookingsWithCount(
      queryParams,
    );

    return this.buildBookingsResponse(bookings, bookingCount);
  }

  private async getBookingsWithCount(
    queryParams: IBookingQueryParamsRequered,
  ): Promise<[BookingWithRelationEntity[], number]> {
    return await Promise.all([
      await this.bookingRepository.getBookingAllByParams(queryParams),
      await this.bookingRepository.countBookings(queryParams),
    ]);
  }

  async createBooking(
    bookingCreateDto: BookingCreateDto,
    token: Token,
  ): Promise<boolean> {

    const currentUserId = this.userService.getUserIdFromToken(token);

    await this.bookingTransaction.createBookingTransaction(bookingCreateDto);

    return true;
  }


  async getBookingById(id: number): Promise<BookingWithRelationEntity> {
    return await this.bookingRepository.getBookingById(id);
  }
  

  private buildBookingsResponse(
    bookings: BookingDto[],
    bookingsCount: number,
  ): ResBookingDto {
    return { bookings, count: bookingsCount };
  }

}

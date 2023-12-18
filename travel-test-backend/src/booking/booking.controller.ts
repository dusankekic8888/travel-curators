import {
  Controller,
  Post,
  Body,
  Headers,
  UsePipes,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { BookingService } from '@app/booking/booking.service';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { BookingCreateDto } from '@app/booking/dto/bookingCreate.dto';
import { IBookingQueryParamsOptional } from './booking.interface';
import { ResBookingDto } from './dto/resBooking.dto';
import { parseQueryParams } from './booking.helper';
import { CustomValidationPipe } from '@app/common/common.pipe';
import { BookingDto } from './dto/booking.dto';
import { ReqBookingCreateDto } from './dto/reqBookingCreate.dto';

@ApiTags('bookings')
@Controller('bookings')
@ApiBearerAuth()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  @ApiCreatedResponse({ type: ResBookingDto })
  async getBookingAll(
    @Query() query: IBookingQueryParamsOptional,
  ): Promise<ResBookingDto> {
    const params = parseQueryParams(query);
    return await this.bookingService.getBookingAllByParams(
      params
    );
  }

  @Get(':id')
  @ApiCreatedResponse({ type: ResBookingDto })
  @UsePipes(new CustomValidationPipe())
  async getBookingById(
    @Param('id') id: number,
  ): Promise<BookingDto> {
    return await this.bookingService.getBookingById(Number(id));
  }

  @Post()
  @ApiBody({ type: ReqBookingCreateDto })
  @ApiCreatedResponse({ type: ReqBookingCreateDto })
  @UsePipes(new CustomValidationPipe())
  async createBooking(
    @Headers('Authorization') auth: string | undefined,
    @Body('booking') bookingCreateDto: BookingCreateDto,
  ): Promise<boolean> {
    return await this.bookingService.createBooking(bookingCreateDto, auth);
  }

}

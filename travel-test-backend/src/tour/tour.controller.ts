import {
  Controller,
  Post,
  UseGuards,
  Body,
  Headers,
  UsePipes,
  Get,
  Query,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TourService } from '@app/tour/tour.service';
import { AuthGuard } from '@app/auth/guard/auth.guard';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ReqTourCreateDto } from './dto/reqTourCreate.dto';
import { TourCreateDto } from '@app/tour/dto/tourCreate.dto';
import { ITourQueryParamsOptional } from './tour.interface';
import { ResTourDto } from './dto/resTour.dto';
import { Token } from '@app/auth/iterface/auth.interface';
import { parseQueryParams } from './tour.helper';
import { ReqTourUpdateDto } from './dto/reqTourUpdate.dto';
import { TourUpdateDto } from './dto/tourUpdate.dto';
import { CustomValidationPipe } from '@app/common/common.pipe';
import { TourDto } from './dto/tour.dto';

@ApiTags('tours')
@Controller('tours')
@ApiBearerAuth()
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Get()
  @ApiCreatedResponse({ type: ResTourDto })
  async getTourAll(
    @Query() query: ITourQueryParamsOptional,
  ): Promise<ResTourDto> {
    const params = parseQueryParams(query);
    return await this.tourService.getTourAllByParams(
      params
    );
  }

  @Get(':id')
  @ApiCreatedResponse({ type: ResTourDto })
  @UsePipes(new CustomValidationPipe())
  async getTourById(
    @Param('id') id: number,
  ): Promise<TourDto> {
    return await this.tourService.getTourById(Number(id));
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiBody({ type: ReqTourCreateDto })
  @ApiCreatedResponse({ type: ReqTourCreateDto })
  @UsePipes(new CustomValidationPipe())
  async createTour(
    @Headers('Authorization') auth: string | undefined,
    @Body('tour') tourCreateDto: TourCreateDto,
  ): Promise<boolean> {
    return await this.tourService.createTour(tourCreateDto, auth);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiBody({ type: ReqTourUpdateDto })
  @ApiCreatedResponse({ type: ReqTourUpdateDto })
  @UsePipes(new CustomValidationPipe())
  async updateTourById(
    @Headers('Authorization') auth: Token,
    @Param('id') id: number,
    @Body('tour') tourUpdatedDto: TourUpdateDto,
  ): Promise<boolean> {
    return await this.tourService.updateTourByIdAndToken(
      Number(id),
      tourUpdatedDto,
      auth,
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @UsePipes(new CustomValidationPipe())
  async deleteTourById(
    @Headers('Authorization') auth: Token,
    @Param('id') id: number,
  ): Promise<void> {
    console.log('deleteTourBySlug');
    return await this.tourService.deleteTourByIdAndToken(Number(id), auth);
  }

}

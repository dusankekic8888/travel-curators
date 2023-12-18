import { Injectable } from '@nestjs/common';
import { CommonService } from '@app/common/common.service';
import { UserService } from '@app/user/user.service';
import { TourRepository } from '@app/tour/tour.repository';
import { ITourQueryParamsRequered } from '@app/tour/tour.interface';
import { TourTransaction } from '@app/tour/tour.transaction';
import { TourCheck } from '@app/tour/tour.check';
import { Token } from '@app/auth/iterface/auth.interface';
import { TourWithRelationEntity } from '@app/tour/entity/tourWithRelation.entity';
import { ResTourDto } from '@app/tour/dto/resTour.dto';
import { TourUpdateDto } from '@app/tour/dto/tourUpdate.dto';
import { TourCreateDto } from '@app/tour/dto/tourCreate.dto';
import { TourToDBDto } from '@app/tour/dto/db/tourToDB.dto';
import { TourDto } from './dto/tour.dto';

@Injectable()
export class TourService {
  constructor(
    private readonly commonService: CommonService,
    private readonly userService: UserService,
    private readonly tourRepository: TourRepository,
    private readonly tourTransaction: TourTransaction,
    private readonly tourCheck: TourCheck,
  ) {}

  async getTourAllByParams(
    queryParams: ITourQueryParamsRequered,
  ): Promise<ResTourDto> {
    const [tours, tourCount] = await this.getToursWithCount(
      queryParams,
    );

    return this.buildToursResponse(tours, tourCount);
  }

  private async getToursWithCount(
    queryParams: ITourQueryParamsRequered,
  ): Promise<[TourWithRelationEntity[], number]> {
    return await Promise.all([
      await this.tourRepository.getTourAllByParams(queryParams),
      await this.tourRepository.countTours(queryParams),
    ]);
  }

  async createTour(
    tourCreateDto: TourCreateDto,
    token: Token,
  ): Promise<boolean> {

    const currentUserId = this.userService.getUserIdFromToken(token);

    const tourToDB = this.prepareToCreateTour(
      tourCreateDto,
      currentUserId,
    );

    await this.tourTransaction.createTourTransaction(tourToDB);

    return true;
  }

  async deleteTourByIdAndToken(id: number, token: Token): Promise<void> {

    const currentUserId = this.userService.getUserIdFromToken(token);

    await this.tourTransaction.deleteTourTransaction(id);
  }

  async updateTourByIdAndToken(
    id: number,
    tourUpdateDto: TourUpdateDto,
    token: Token,
  ): Promise<boolean> {
    await this.checkExistTourById(id);

    const currentUserId = this.userService.getUserIdFromToken(token);

    const tourToDB = this.prepareToUpdateTour(tourUpdateDto, currentUserId);


    await this.tourTransaction.updateTourTransaction(
      tourToDB,
      id,
    );
    return true;
  }

  async getTourById(id: number): Promise<TourWithRelationEntity> {
    return await this.tourRepository.getTourById(id);
  }

  private async checkExistTourById(id: number): Promise<void> {
    const tour = await this.tourRepository.getTourById(id);
    this.tourCheck.isExist(!!tour);
  }
  
  private prepareToCreateTour(
    tourCreateDto: TourCreateDto,
    currentUserId: number,
  ): TourToDBDto {
    const {...tour } = tourCreateDto;
    const tourToDB = this.prepareTourToCreateDb(
      tour,
      currentUserId,
    );
    return tourToDB
  }

  private prepareToUpdateTour(
    tourCreateDto: TourUpdateDto,
    currentUserId: number,
  ): TourToDBDto {
    const { ...tour } = tourCreateDto;
    const tourToDB = this.prepareTourToUpdateDb(
      tour,
      currentUserId
    );
    return tourToDB;
  }

  private prepareTourToCreateDb(
    tourCreateDto: TourCreateDto,
    currentUserId: number,
  ): TourToDBDto {
    const { title, description, thumbnail } = tourCreateDto;
    return { title, description, createdById: currentUserId, thumbnail };
  }

  private prepareTourToUpdateDb(
    tourUpdateDto: TourUpdateDto,
    createdById: number,
  ): TourToDBDto {
    const { title, description, thumbnail } = tourUpdateDto;
    return {
      createdById,
      title,
      description,
      thumbnail
    };
  }

  private buildToursResponse(
    tours: TourDto[],
    toursCount: number,
  ): ResTourDto {
    return { tours, count: toursCount };
  }

}

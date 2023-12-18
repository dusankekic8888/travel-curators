import { HttpExceptionCustom } from '@app/common/common.exception';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class TourCheck {
  isCreated(bool: boolean): boolean {
    if (!bool) {
      throw new HttpExceptionCustom(
        'Tour not created',
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }

  isUpdated(bool: boolean): boolean {
    if (!bool) {
      throw new HttpExceptionCustom(
        'Tour not updated',
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }

  isDeleted(bool: boolean): boolean {
    if (bool) {
      throw new HttpExceptionCustom(
        'Tour not deleted',
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }

  isNotExist(bool: boolean | undefined): boolean {
    if (bool) {
      throw new HttpExceptionCustom(
        'Tour already exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }

  isExist(bool: boolean | undefined): boolean {
    if (!bool) {
      throw new HttpExceptionCustom(
        'Tour not found',
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }

}

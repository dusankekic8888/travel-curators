import { HttpExceptionCustom } from '@app/common/common.exception';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class BookingCheck {
  isCreated(bool: boolean): boolean {
    if (!bool) {
      throw new HttpExceptionCustom(
        'Booking not created',
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }

  isUpdated(bool: boolean): boolean {
    if (!bool) {
      throw new HttpExceptionCustom(
        'Booking not updated',
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }

  isDeleted(bool: boolean): boolean {
    if (bool) {
      throw new HttpExceptionCustom(
        'Booking not deleted',
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }


  isExist(bool: boolean | undefined): boolean {
    if (!bool) {
      throw new HttpExceptionCustom(
        'Booking not found',
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }

}

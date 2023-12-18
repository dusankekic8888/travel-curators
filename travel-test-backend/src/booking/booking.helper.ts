import {
  IBookingQueryParamsRequered,
  IBookingQueryParamsOptional,
  SortByBookingEnum,
  SortDirectionEnum,
} from '@app/booking/booking.interface';

const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;
const DEFAULT_ORDER_BY = SortByBookingEnum.BOOKING_DATE;
const DEFAULT_DIRECTION = SortDirectionEnum.ASC;

export const parseQueryParams = (
  query: IBookingQueryParamsOptional,
): IBookingQueryParamsRequered => {
  const { limit, offset, orderBy, direction } = query;

  const parsedParams: IBookingQueryParamsRequered = {
    limit: limit !== undefined ? +limit : DEFAULT_LIMIT,
    offset: offset !== undefined ? +offset : DEFAULT_OFFSET,
    orderBy: orderBy !== undefined ? orderBy : DEFAULT_ORDER_BY,
    direction: direction !== undefined ? direction : DEFAULT_DIRECTION,
  };

  return parsedParams;
};

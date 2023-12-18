import {
  ITourQueryParamsRequered,
  ITourQueryParamsOptional,
  SortByTourEnum,
  SortDirectionEnum,
} from '@app/tour/tour.interface';

const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;
const DEFAULT_ORDER_BY = SortByTourEnum.TITLE;
const DEFAULT_DIRECTION = SortDirectionEnum.ASC;

export const parseQueryParams = (
  query: ITourQueryParamsOptional,
): ITourQueryParamsRequered => {
  const { limit, offset, orderBy, direction } = query;

  const parsedParams: ITourQueryParamsRequered = {
    limit: limit !== undefined ? +limit : DEFAULT_LIMIT,
    offset: offset !== undefined ? +offset : DEFAULT_OFFSET,
    orderBy: orderBy !== undefined ? orderBy : DEFAULT_ORDER_BY,
    direction: direction !== undefined ? direction : DEFAULT_DIRECTION,
  };

  return parsedParams;
};

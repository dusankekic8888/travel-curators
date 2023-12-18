export enum SortDirectionEnum {
  DESC = 'desc',
  ASC = 'asc',
}

export enum SortByBookingEnum {
  BOOKING_DATE = 'bookingDate',
}

type Nullable<T> = {
  [K in keyof T]?: T[K];
};

type Required<T> = {
  [K in keyof T]-?: T[K];
};

interface IQueryParamsBase {
  limit?: number;
  offset?: number;
  orderBy?: SortByBookingEnum;
  direction?: SortDirectionEnum;
}

export type IBookingQueryParamsOptional = Nullable<IQueryParamsBase>;

export type IBookingQueryParamsRequered = Required<IQueryParamsBase>;

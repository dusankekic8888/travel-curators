export enum SortDirectionEnum {
  DESC = 'desc',
  ASC = 'asc',
}

export enum SortByTourEnum {
  TITLE = 'title',
  CREATED_AT = 'createdAt',
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
  orderBy?: SortByTourEnum;
  direction?: SortDirectionEnum;
}

export type ITourQueryParamsOptional = Nullable<IQueryParamsBase>;

export type ITourQueryParamsRequered = Required<IQueryParamsBase>;

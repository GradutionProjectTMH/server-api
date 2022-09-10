export const LIMIT = 10;
export const PAGE = 1;

export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
}

export enum USER_STATUS {
  ACTIVE = 'active',
  BLOCK = 'BLOCK',
}

export enum PRODUCT_STATUS {
  PENDDING = 'pendding',
  APPROVE = 'approve',
  REJECTED = 'rejected',
}

export enum ORDER_STATUS {
  PENDDING = 'pendding',
  APPROVE = 'approve',
  REJECTED = 'rejected',
}

export enum COMMENT_SORT {
  NEWST = 'newst',
  DESCENDING_STAR = 'descending_star',
  ASCENDING_STAR = 'ascending_star',
}

export enum PRODUCT_SORT {
  NEWST = 'newst',
  HIGHT_TO_LOW = 'hight_to_low',
  LOW_TO_HIGHT = 'low_to_hight',
  DESCENDING_STAR = 'descending_star',
  ASCENDING_STAR = 'ascending_star',
  BUY_A_LOT = 'buy_a_lot',
}

export interface IResponse<T> {
  success: any;
  error?: any;
  message?: string;
  data?: T;
}

export interface IResponseList<T> {
  success: any;
  error?: any;
  message?: string;
  data?: DataList<T>;
}

export interface DataList<T> {
  list: T[];
  totalPage?: number;
  currentPage?: number;
}

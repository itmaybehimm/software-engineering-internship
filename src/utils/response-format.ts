export class PaginationFormat {
  currentPage: number;
  pageSize: number;
  totalPages?: number;
  totalItems?: number;
}

export class ResponseFormat<T> {
  status: number;
  message: string;
  data?: T;
  pagination?: PaginationFormat;
  errors?: string[] | object;
}

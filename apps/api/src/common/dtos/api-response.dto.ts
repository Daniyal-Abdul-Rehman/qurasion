export class ApiResponseDto<T> {
  data?: T;
  error?: ApiErrorDto;
  requestId: string;

  constructor(requestId: string, data?: T, error?: ApiErrorDto) {
    this.requestId = requestId;
    this.data = data;
    this.error = error;
  }

  static success<T>(requestId: string, data: T): ApiResponseDto<T> {
    return new ApiResponseDto(requestId, data);
  }

  static error(requestId: string, code: string, message: string, details?: any): ApiResponseDto<any> {
    return new ApiResponseDto(requestId, undefined, {
      code,
      message,
      requestId,
      details,
    });
  }
}

export class ApiErrorDto {
  code: string;
  message: string;
  requestId: string;
  details?: any;
}

export class PaginationDto {
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

export class PaginatedResponseDto<T> {
  data: T[];
  pagination: PaginationDto;
  requestId: string;

  constructor(requestId: string, data: T[], pagination: PaginationDto) {
    this.requestId = requestId;
    this.data = data;
    this.pagination = pagination;
  }
}

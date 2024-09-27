type SuccessResponse<D> = {
  type: 'success';
  status: number;
  data: D;
};

type FailureResponse = {
  type: 'error';
  status: number;
  message: string;
};

type ApiResponse<D> = SuccessResponse<D> | FailureResponse;

export type { SuccessResponse, FailureResponse, ApiResponse };

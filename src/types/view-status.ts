export const VIEW_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

interface IdleStatus {
  status: typeof VIEW_STATUS.IDLE;
}

interface LoadingStatus {
  status: typeof VIEW_STATUS.LOADING;
}

interface SuccessStatus<T> {
  status: typeof VIEW_STATUS.SUCCESS;
  data: T;
}

interface ErrorStatus {
  status: typeof VIEW_STATUS.ERROR;
  error: Error;
}

export type ViewStatus<T> = IdleStatus | LoadingStatus | SuccessStatus<T> | ErrorStatus;

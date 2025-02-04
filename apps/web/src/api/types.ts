import { NextResponse } from 'next/server';

export type ApiResponseData<T> = { data: T } | { error: string };
export type ApiResponse<T> = NextResponse<ApiResponseData<T>>;

export function isErrorResponse<T>(data: ApiResponseData<T>): data is { error: string } {
  return 'error' in data && typeof data.error === 'string';
}

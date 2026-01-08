export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  code?: number;
}
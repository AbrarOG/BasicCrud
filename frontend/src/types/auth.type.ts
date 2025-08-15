export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token?: string; // optional if backend sends JWT
}

export interface AuthResponse {
  ok: boolean;
  uid?: string;
  name?: string;
  email?: string;
  token?: string;
  msg?: string;
}

export interface Usuario {
  uid: string;
  username: string;
  email: string;
}

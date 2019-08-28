/**
 * Interface for the 'Authentication' data
 */
export interface AuthenticationEntity {
  id: number | string; // Primary ID
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthenticationResultI {
  authenticated: boolean;
  privileges: string;
  token: string;
  type: null | number;
  userId: string;
}

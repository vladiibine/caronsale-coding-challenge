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

export interface AuthenticationResult {
  authenticated: boolean;
  privileges: string;
  token: string;
  type: null | '0' | '1' | '2' | '3' | '4';
  userId: string;
}

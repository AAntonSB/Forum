export interface User {
  email: string;
  password: string;
}

export interface UserPayload {
  id: string;
  email: string;
  password: string;
  salt: string;
}

export interface optionalId {
  id: string | undefined;
}
export interface User {
  username: string;
  password: string;
}

export interface UserPayload {
  id: string;
  username: string;
  password: string;
  salt: string;
}

export interface optionalId {
  id: string | undefined;
}
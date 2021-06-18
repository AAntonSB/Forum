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

export interface SubForum {
  id: string;
  title: string;
  description: String;
  posts: string[];
}

export interface FetchPayload {
  error: boolean;
  loading: boolean;
}
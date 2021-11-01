export interface UserRegister {
  username: string;
  email: string;
  password: string;
}

export interface UserLogin {
  username: string;
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
  title: string;
}

export interface FetchPayload {
  error: boolean;
  loading: boolean;
}

export interface Post {
  title: string;
  text: string;
  subForumID: string;
}

export interface Reply {
  text: string;
  postID: string;
}

export interface TokenHeader {
  token: string;
  tokenName: string;
}
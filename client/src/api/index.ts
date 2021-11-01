import axios from 'axios'
import {UserLogin, UserRegister, SubForum, Post, Reply, TokenHeader} from '../types/Mongo/types'

const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3000/"
})

export const userRequests = {
  signup: (payload: UserRegister) => api.post("/users/signup", payload),
  login: (payload: UserLogin) => api.post("users/login", payload),
  refreshToken: (payload?: {prevCookie: String}) => payload?api.post("users/refreshToken", payload):api.post("users/refreshToken"),
  me: () => api.get("users/me"),
  logout: (headers: TokenHeader) => api.get("/users/logout",
    {
      headers: {
    'Authorization': `${headers.tokenName} ${headers.token}`
  }}),
  getAllUsers: (headers: TokenHeader) => api.get("/users", {
    headers: {
    'Authorization': `${headers.tokenName} ${headers.token}`
    }
  }),
  update: (payload: { comment: string, roleID: string, userID: string }, headers: TokenHeader) => api.put("/users", payload, { headers: { 'Authorization': `${headers.tokenName} ${headers.token}` } }),
  delete: (payload: { userID: string}, headers: TokenHeader) => api.delete("/users", { data: { userID: payload.userID}, headers: { 'Authorization': `${headers.tokenName} ${headers.token}`}})
}

export const subForumRequests = {
  create: (payload: SubForum) => api.post("/subForums", payload),
  getAll: () => api.get("/subForums"),
  delete: (payload: { subForumID: string}, headers: TokenHeader) => api.delete("/subForums", { data: { subForumID: payload.subForumID}, headers: { 'Authorization': `${headers.tokenName} ${headers.token}`}})
}

export const postRequests = {
  create: (payload: Post, headers: TokenHeader) => api.post(
    "/posts",
    payload,
    { headers: { 'Authorization': `${headers.tokenName} ${headers.token}` } }),
  getAll: () => api.get("/posts"),
  getAllFrom: (subForumTitle: string) => api.get("/posts/filter", { params: { title: subForumTitle } }),
  getById: (id: string) => api.get("posts/id", { params: { id: id } }),
  delete: (payload: { postID: string, subForumID: string}, headers: TokenHeader) => api.delete("/posts", { data: { postID: payload.postID, subForumID: payload.subForumID
  }, headers: { 'Authorization': `${headers.tokenName} ${headers.token}` }
  }),
  lock: ( payload: {subForumID: string, postID: string}, headers: TokenHeader) => api.put("/posts/lock", payload, {headers: { 'Authorization': `${headers.tokenName} ${headers.token}` }}),
}

export const replyRequests = {
  create: (payload: Reply, headers: TokenHeader) => api.post(
    "/replies",
    payload,
    { headers: { 'Authorization': `${headers.tokenName} ${headers.token}`}}
  ),
    createWarning: (payload: Reply, headers: TokenHeader) => api.post(
    "/replies/warning",
    payload,
    { headers: { 'Authorization': `${headers.tokenName} ${headers.token}`}}
  ),
  getAllFrom: (postID: string) => api.get("/replies", { params: { id: postID } }),
    delete: (payload: { replyID: string, subForumID: string}, headers: TokenHeader) => api.delete("/replies", { data: { replyID: payload.replyID, subForumID: payload.subForumID
  }, headers: { 'Authorization': `${headers.tokenName} ${headers.token}` }
  }),
}

export const roleRequests = {
  create: (payload: { name: string }, headers: TokenHeader) => 
    api.post("/roles", payload, { headers: { 'Authorization': `${headers.tokenName} ${headers.token}`}})
  ,
  update: (payload: {roleID: string, subForumID: string}, headers: TokenHeader) => api.put("/roles", payload, { headers: { 'Authorization': `${headers.tokenName} ${headers.token}`}}),
  getAllFrom: (headers: TokenHeader) => api.get("/roles", { headers: { 'Authorization': `${headers.tokenName} ${headers.token}`}})
}
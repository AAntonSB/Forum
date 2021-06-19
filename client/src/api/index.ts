import axios from 'axios'
import {User, UserPayload, SubForum, Post} from '../types/Mongo/types'

const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3000/api"
})

export const userRequests = { 
  register: (payload: User) => api.post("/register", payload),
  login: (payload: User) => api.post("/login", payload),
  get: (id: string) => api.get<UserPayload>(`/user/${id}`),
  delete: (id: string) => api.delete(`/user/${id}`),
  getAll: () => api.get("/users"),
  loggedInUser: () => api.get("user")
}

export const subForumRequests = {
  create: (payload: SubForum) => api.post("/sub-forum", payload),
  getAll: () => api.get("/sub-forums")
}

export const postRequests = {
  create: (payload: Post) => api.post("/post", payload),
}
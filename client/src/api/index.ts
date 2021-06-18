import axios from 'axios'
import {User, UserPayload, SubForum} from '../types/Mongo/types'

const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3000/api"
})

const userRequests = { 
  register: (payload: User) => api.post("/register", payload),
  login: (payload: User) => api.post("/login", payload),
  get: (id: string) => api.get<UserPayload>(`/user/${id}`),
  delete: (id: string) => api.delete(`/user/${id}`),
  getAll: () => api.get("/users"),
  loggedInUser: () => api.get("user")
}

const subForumRequests = {
  create: (payload: SubForum) => api.post("/sub-forum", payload),
  getAll: () => api.get("/sub-forums")
}

export {userRequests, subForumRequests}
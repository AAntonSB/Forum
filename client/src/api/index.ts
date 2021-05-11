import axios from 'axios'
import {User, optionalId, UserPayload} from '../types/Mongo/types'

const api = axios.create({
    baseURL: "http://localhost:3000/api"
})

const userRequests = { 
  register: (payload: User) => api.post("/user", payload),
  get: (id?: optionalId) => api.get<UserPayload>(`/user/${id}`),
  delete: (id: string) => api.delete(`/user/${id}`),
  getAll: () => api.get("/users")
}

export default userRequests
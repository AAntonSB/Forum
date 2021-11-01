import { createContext, useContext } from "react"
export type UserContext = {
  token: string | null
  setToken:(t: string | null) => void
}
export const MyUserContext = createContext<UserContext>({
token: 'Hello World', // set a default value
setToken: () => {},
})
export const useUserContext = () => useContext(MyUserContext)
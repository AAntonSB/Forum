interface UserPayload {
  id: number
  title: string
  description: string
  status: boolean
}

type UserContext = {
  user: UserPayload
  setuser: (todo: UserPayload) => void
}
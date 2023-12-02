export type User = {
  email: string
  password: string
}

export type GetUsersResponse = {
  data: User[]
}

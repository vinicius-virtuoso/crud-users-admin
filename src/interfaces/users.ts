import { QueryResult } from 'pg'

export interface User {
  id: number
  name: string
  email: string
  password: string
  admin: boolean
  active: boolean
}

export type UserCreate = Omit<User, 'id'>
export type UserLogin = Omit<User, 'password'>
export type UserResult = QueryResult<Omit<User, 'password'>>

import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { QueryConfig, QueryResult } from 'pg'
import { client } from '../../database/connection'
import { AppError } from '../../errors'
import { User } from '../../interfaces/users'

export const loginUserService = async (user: User) => {
  const { email, password } = user

  const queryString = `
    SELECT * FROM users WHERE email = $1
  `

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [email],
  }

  const queryResult: QueryResult<User> = await client.query(queryConfig)
  const result = queryResult.rows[0]

  if (!result) {
    throw new AppError('Wrong email/password', 401)
  }

  const pwdMatch = await compare(password, result.password)

  if (!pwdMatch) {
    throw new AppError('Wrong email/password', 401)
  }

  if (!result.active) {
    throw new AppError('User disabled!', 401)
  }

  const token: string = sign({ email }, String(process.env.SECRET_KEY), {
    expiresIn: '24h',
    subject: String(result.id),
  })

  const userReturn = {
    id: result.id,
    name: result.name,
    email: result.email,
    admin: result.admin,
    active: result.active,
  }

  return { token, userReturn }
}

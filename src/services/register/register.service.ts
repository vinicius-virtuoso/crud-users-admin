import { client } from '../../database/connection'
import { User } from '../../interfaces/users'
import format from 'pg-format'
import { hash } from 'bcryptjs'

export const registerUserService = async (user: User) => {
  const { name, email, password, admin } = user

  if (password) {
    const cryptoPassword = await hash(password, 12)

    const queryString = format(
      `
    INSERT INTO users (%I)
    VALUES (%L)
    RETURNING id,name,email,admin,active;
  `,
      ['name', 'email', 'password', 'admin'],
      [name, email, cryptoPassword, admin]
    )

    const queryResult = await client.query(queryString)
    const result = queryResult.rows[0]

    user = result
  }

  return user
}

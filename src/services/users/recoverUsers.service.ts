import { client } from '../../database/connection'
import { UserResult } from '../../interfaces/users'
import { QueryConfig } from 'pg'

import { AppError } from '../../errors'
import format from 'pg-format'

export const recoverUsersService = async (id: string) => {
  const queryStringFind = `SELECT id,name,email,admin,active FROM users WHERE id = $1;`

  const queryConfig: QueryConfig = {
    text: queryStringFind,
    values: [id],
  }

  const queryResultFind: UserResult = await client.query(queryConfig)
  const user = queryResultFind.rows[0]

  if (user.active) {
    throw new AppError('User already active', 400)
  }

  const queryString = format(
    `
  UPDATE users
  SET
    (%I) = ROW(%L)
  WHERE id = ${id}
  RETURNING name,email,admin,active;`,
    ['active'],
    [true]
  )

  const queryResult: UserResult = await client.query(queryString)
  const result = queryResult.rows[0]

  return result
}

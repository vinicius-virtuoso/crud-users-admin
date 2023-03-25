import { QueryConfig } from 'pg'
import { client } from '../../database/connection'
import { UserResult } from '../../interfaces/users'

export const retrieveUsersService = async (id: string) => {
  console.log(id)

  const queryString = `SELECT id,name,email,admin,active FROM users WHERE id = $1;`

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  }

  const queryResult: UserResult = await client.query(queryConfig)
  const user = queryResult.rows[0]

  return user
}

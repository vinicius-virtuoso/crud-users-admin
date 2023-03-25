import { QueryConfig } from 'pg'
import { client } from '../../database/connection'
import { UserResult } from '../../interfaces/users'

export const listUsersService = async () => {
  const queryString = `
    SELECT 
        id,
        name,
        email,
        admin,
        active 
    FROM 
        users 
    WHERE 
        active = $1 
    ORDER BY id ASC;`

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [true],
  }

  const queryResult: UserResult = await client.query(queryConfig)
  const users = queryResult.rows

  return users
}

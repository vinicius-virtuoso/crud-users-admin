import { client } from '../../database/connection'
import { UserResult } from '../../interfaces/users'

import { QueryConfig } from 'pg'

export const disabledUsersService = async (id: string) => {
  const queryString = `
  UPDATE 
    users
  SET
    active = $1
  WHERE id = $2;`

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [false, id],
  }

  const queryResult: UserResult = await client.query(queryConfig)
  const result = queryResult.rows[0]

  return result
}

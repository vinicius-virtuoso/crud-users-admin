import { hash } from 'bcryptjs'
import { QueryConfig } from 'pg'
import format from 'pg-format'
import { client } from '../../database/connection'
import { UserResult } from '../../interfaces/users'

interface UpdateProps {
  id: string
  data: {
    name?: string
    email?: string
    password?: string
  }
}

export const updateUsersService = async ({ id, data }: UpdateProps) => {
  const queryString = `SELECT id,name,email,admin,active FROM users WHERE id = $1;`

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  }

  const queryResult: UserResult = await client.query(queryConfig)
  const user = queryResult.rows[0]

  if (data?.password) {
    data.password = await hash(data.password, 12)
  }

  if (user) {
    const queryString = format(
      `
    UPDATE users
    SET
      (%I) = ROW(%L)
    WHERE id = ${id}
    RETURNING name,email;`,
      Object.keys(data).filter((k) => k !== undefined),
      Object.values(data).filter((v) => v !== undefined)
    )

    const queryResult: UserResult = await client.query(queryString)
    const result = queryResult.rows[0]

    return result
  }
}

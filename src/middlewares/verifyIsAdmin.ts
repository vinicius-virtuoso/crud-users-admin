import { QueryConfig } from 'pg'
import { NextFunction, Request, Response } from 'express'
import { UserResult } from '../interfaces/users'
import { client } from '../database/connection'
import { AppError } from '../errors'

export const verifyIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  const { token_id } = req

  if (id !== token_id) {
    const queryString = `SELECT * FROM users WHERE id = $1;`

    const queryConfig: QueryConfig = {
      text: queryString,
      values: [token_id],
    }

    const queryResult: UserResult = await client.query(queryConfig)
    const user = queryResult.rows[0]

    if (!user.admin) {
      throw new AppError('Insufficient permission.', 403)
    }
  }

  return next()
}

import { QueryConfig } from 'pg'
import { NextFunction, Request, Response } from 'express'
import { UserResult } from '../interfaces/users'
import { client } from '../database/connection'
import { AppError } from '../errors'

export const verifyFindUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token_id = req.params.id || req.token_id

  const queryString = `SELECT * FROM users WHERE id = $1;`

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [token_id],
  }

  const queryResult: UserResult = await client.query(queryConfig)
  const user = queryResult.rows[0]

  if (!user) {
    throw new AppError('User not found.', 404)
  }

  return next()
}

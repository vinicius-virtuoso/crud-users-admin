import { UserCreate, UserResult } from './../interfaces/users'
import { Request, Response, NextFunction } from 'express'
import { QueryConfig } from 'pg'
import { client } from '../database/connection'
import { AppError } from '../errors'

export const verifyExistsUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email }: UserCreate = req.body

  const queryString = `
        SELECT email FROM users WHERE email = $1;
    `
  const querConfig: QueryConfig = {
    text: queryString,
    values: [email],
  }

  const queryResult = await client.query(querConfig)
  const result: UserResult = queryResult.rows[0]

  if (result) {
    throw new AppError('E-mail already registered!', 409)
  }

  return next()
}

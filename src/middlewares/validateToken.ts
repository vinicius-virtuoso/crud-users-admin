import { NextFunction, Request, Response } from 'express'
import { TokenExpiredError, verify } from 'jsonwebtoken'
import { AppError } from '../errors'

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization

  const token = authToken?.split(' ')[1]

  if (!token) {
    throw new AppError('Missing authorization token', 401)
  }

  try {
    const validateTokenSecret = verify(token, String(process.env.SECRET_KEY))

    req.token_id = String(validateTokenSecret.sub)
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      throw new AppError('Token access expired or invalid')
    }
  }

  return next()
}

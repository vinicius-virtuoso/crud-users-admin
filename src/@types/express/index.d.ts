import express from 'express'

declare global {
  namespace Express {
    interface Request {
      token_id: string
    }
  }
}

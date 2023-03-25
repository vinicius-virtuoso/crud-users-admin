import 'express-async-errors'
import { errorHandler } from './errors'
import express, { Application } from 'express'
import { usersRouter } from './routes/users.routes'

export const app: Application = express()
app.use(express.json())

app.use('/users', usersRouter)

app.use(errorHandler)

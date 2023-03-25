import { listUsersService } from './../services/users/listUsers.service'
import { disabledUsersService } from './../services/users/disabledUsers.service'
import { recoverUsersService } from '../services/users/recoverUsers.service'
import { updateUsersService } from './../services/users/updateUsers.service'
import { Request, Response } from 'express'
import { retrieveUsersService } from '../services/users/retrieveUsers.service'
import { loginUserService } from '../services/login/login.service'
import { registerUserService } from '../services/register/register.service'

interface DataProps {
  name?: string
  email?: string
  password?: string
}

export class UsersController {
  async handle(req: Request, res: Response) {
    const users = await listUsersService()

    return res.status(200).json(users)
  }

  async login(req: Request, res: Response) {
    const { token, userReturn } = await loginUserService(req.body)

    return res.status(201).json({
      token,
      user: { ...userReturn },
    })
  }

  async register(req: Request, res: Response) {
    const createUser = await registerUserService(req.body)

    return res.status(201).json(createUser)
  }

  async profile(req: Request, res: Response) {
    const token_id = req.token_id

    const user = await retrieveUsersService(token_id)

    return res.status(201).json(user)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const data = req.body

    const user = await updateUsersService({ id, data })

    return res.status(201).json(user)
  }

  async recover(req: Request, res: Response) {
    const { id } = req.params

    const user = await recoverUsersService(id)

    return res.status(200).json(user)
  }

  async disabled(req: Request, res: Response) {
    const { id } = req.params

    await disabledUsersService(id)

    return res.status(204).json()
  }
}

import { registerSchema } from './../schemas/register.schema'
import { updateSchema } from './../schemas/update.schema'
import { verifyFindUser } from './../middlewares/verifyFindUser'
import { verifyIsAdmin } from './../middlewares/verifyIsAdmin'
import { Router } from 'express'
import { loginSchema } from '../schemas/login.schema'
import { verifyExistsUsers } from './../middlewares/verifyExistsUsers'
import { validateBody } from '../middlewares/validateBody'

import { UsersController } from '../controllers/users.controller'
import { validateToken } from '../middlewares/validateToken'

export const usersRouter = Router()

const usersController = new UsersController()

usersRouter.post(
  '/',
  validateBody(registerSchema),
  verifyExistsUsers,
  usersController.register
)

usersRouter.post('/login', validateBody(loginSchema), usersController.login)

usersRouter.get('/', validateToken, usersController.handle)

usersRouter.get(
  '/profile',
  validateToken,
  verifyFindUser,
  usersController.profile
)

usersRouter.patch(
  '/:id',
  validateBody(updateSchema),
  validateToken,
  verifyFindUser,
  verifyExistsUsers,
  verifyIsAdmin,
  usersController.update
)

usersRouter.delete(
  '/:id',
  validateToken,
  verifyFindUser,
  verifyIsAdmin,
  usersController.disabled
)

usersRouter.put(
  '/:id/recover',
  validateToken,
  verifyFindUser,
  verifyIsAdmin,
  usersController.recover
)

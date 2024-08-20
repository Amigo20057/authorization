import { Router } from 'express'
import { UserService } from './user.service'

const router = Router()
const userService = new UserService()

export const userRouter = router

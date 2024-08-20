import { createUserDto } from '@/user/user.dto'
import { UserService } from '@/user/user.service'
import { Request, Response, Router } from 'express'
import { AuthService } from './auth.service'

const router = Router()
const authService = new AuthService()
const userService = new UserService()

router.post('/register', async (req: Request, res: Response) => {
	try {
		const validation = createUserDto.safeParse(req.body)

		if (!validation.success) {
			return res.status(400).json({ message: 'Validation error' })
		}

		const user = await userService.createUser(req.body)
		res.status(201).json(user)
	} catch (err: any) {
		res.status(500).json({
			error: err.message,
		})
	}
})

router.post('/login', async (req: Request, res: Response) => {
	try {
		const user = await authService.login(req.body)
		res.status(201).json(user)
	} catch (err: any) {
		res.status(500).json({
			error: err.message,
		})
	}
})

export const authRouter = router

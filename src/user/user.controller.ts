import { checkAuth } from '@/utils/auth.middleware'
import { Request, Response, Router } from 'express'
import { UserService } from './user.service'

const router = Router()
const userService = new UserService()

router.delete('/delete', checkAuth, async (req: Request, res: Response) => {
	try {
		await userService.deleteUser(req.body)
		res.status(201).json({
			success: true,
		})
	} catch (err: any) {
		res.status(500).json({
			error: err.message,
		})
	}
})

export const userRouter = router

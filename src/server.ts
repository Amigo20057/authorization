import { PrismaClient } from '@prisma/client'
import compression from 'compression'
import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import { authRouter } from './auth/auth.controller'
import { userRouter } from './user/user.controller'
import { logger } from './utils/log'

const PORT = process.env.PORT
const app = express()
export const prisma = new PrismaClient()

async function main() {
	app.use(helmet())
	app.use(compression())
	app.use(express.json())

	app.use('/auth', authRouter)
	app.use('/user', userRouter)

	app.all('*', (req, res) => {
		res.status(404).json({ message: 'Not Found' })
	})

	app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		logger.error(err.stack)
		res.status(500).send('Error')
	})

	app.listen(PORT, () => {
		logger.info(`Server is running on PORT ${PORT}`)
	})
}

main()
	.catch(async e => {
		logger.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})

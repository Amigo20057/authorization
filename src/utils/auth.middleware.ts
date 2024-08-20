import 'dotenv/config'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const SECRET = process.env.SECRET || ''

export const checkAuth = async (
	req: Request & { _id?: string },
	res: Response,
	next: NextFunction
) => {
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

	if (!token) {
		return res.status(401).json({ message: 'Authorization token is required' })
	}

	try {
		const decoded = jwt.verify(token, SECRET) as { _id: string }
		req._id = decoded._id
		next()
	} catch (err) {
		return res.status(403).json({ message: 'Invalid token' })
	}
}

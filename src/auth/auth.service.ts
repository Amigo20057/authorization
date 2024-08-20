import { UserService } from '@/user/user.service'
import * as bcrypt from 'bcrypt'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { ILogin } from './auth.types'

export class AuthService extends UserService {
	private SECRET = process.env.SECRET || ''

	async login(dto: ILogin) {
		const user = await this.findUserByEmail(dto.email)
		if (!user) {
			throw new Error('User does not exist')
		}

		const validPassword = await bcrypt.compare(dto.password, user.password)
		if (!validPassword) {
			throw new Error('Incorrect login or password')
		}

		const token = jwt.sign({ _id: user.id }, this.SECRET, { expiresIn: '30d' })

		return { ...user, token }
	}
}

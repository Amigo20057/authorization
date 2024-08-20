import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IUser } from './user.types'

export class UserService {
	protected prisma = new PrismaClient()

	async hashPassword(password: string) {
		return bcrypt.hash(password, 10)
	}

	async findUserByName(name: string) {
		return await this.prisma.user.findUnique({ where: { name } })
	}

	async findUserByEmail(email: string) {
		return await this.prisma.user.findUnique({ where: { email } })
	}

	async createUser(dto: IUser): Promise<IUser & { token: string }> {
		const existUserName = await this.findUserByName(dto.name)
		const existUserEmail = await this.findUserByEmail(dto.email)
		if (existUserName || existUserEmail) {
			throw new Error('User already exists')
		}

		dto.password = await this.hashPassword(dto.password)

		const createdUser = await this.prisma.user.create({
			data: {
				name: dto.name,
				email: dto.email,
				password: dto.password,
			},
		})

		const token = jwt.sign({ _id: createdUser.id }, process.env.SECRET || '', {
			expiresIn: '30d',
		})

		return { ...createdUser, token }
	}
}

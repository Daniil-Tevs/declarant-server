import { verify } from 'argon2'
import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'
import { generateToken } from '../../utils/auth.utils.js'

// @desc Login admin
// @route POST /api/admin/auth/login
// @access Public

export const login = asyncHandler(async (req, res) => {
	try {
		const { login, password } = req.body

		if (!login || !password) {
			res.status(400)
			throw new Error('Логин и пароль обязательны')
		}

		const admin = await prisma.admin.findFirst({
			where: {
				login: login
			}
		})

		if (!admin) {
			res.status(404)
			throw new Error('Неверный логин')
		}

		const isValidPassword = await verify(admin.password, password)

		if (!isValidPassword) {
			res.status(401)
			throw new Error('Неверный пароль')
		}

		res.json({ token: generateToken(admin.id) })
	} catch (error) {
		res.status(404)
		throw new Error(error)
	}
})

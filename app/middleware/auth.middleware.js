import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { prisma } from '../prisma.js'

export const auth = asyncHandler(async (req, res, next) => {
	let token
	if (req.headers.authorization?.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1]

		const { id } = jwt.verify(token, process.env.JWT_SECRET)

		const admin = await prisma.admin.findUnique({
			where: { id }
		})

		if (admin) {
			next()
		} else {
			res.status(401)
			throw new Error('Not authorization token failed')
		}
	}

	if (!token) {
		res.status(401)
		throw new Error('Not authorization, do not have a token')
	}
})

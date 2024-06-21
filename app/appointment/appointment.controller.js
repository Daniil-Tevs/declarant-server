import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc add appointment
// @route POST /api/appointment/
// @access Public

export const addAppointment = asyncHandler(async (req, res) => {
	const { theme, name, job, phone, mail, comment } = req.body

	if (!name || !phone) {
		res.status(400)
		throw new Error(`Имя и телефон обязательные поля`)
	}

	try {
		const appointment = await prisma.appointment.create({
			data: { theme, name, job, phone, mail, comment, date: new Date() }
		})

		if (!appointment) {
			res.status(500)
			throw new Error(`Заявка не добавлена по техническим причинам`)
		}

		res.status(200).json(appointment)
	} catch (error) {
		res.status(404)
		throw new Error(error)
	}
})

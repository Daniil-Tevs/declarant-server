import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { getStructureTable } from '../utils/table.utils.js'

const forbidden = ['admin']

export const availableTable = asyncHandler(async (req, res, next) => {
	const { table } = req.params

	if (!forbidden.includes(table)) {
		next()
	} else {
		res.status(401)
		throw new Error('Данная таблица запрещена к изменению')
	}
})

export const existTable = asyncHandler(async (req, res, next) => {
	const { table } = req.params

	if (!prisma[table]) {
		res.status(404)
		throw new Error('Данная таблица не найдена')
	} else {
		next()
	}
})

export const validateParams = asyncHandler(async (req, res, next) => {
	const { table } = req.params

	const invalidatedFields = []
	const fields = getStructureTable(table)

	Object.keys(fields).forEach(field => {
		if (field != 'id' && !req.body[field] && fields[field].require)
			invalidatedFields.push(field)
	})

	if (fields.id.type === 'Int' && req.body.id) delete req.body.id

	if (invalidatedFields.length > 0) {
		res.status(400)
		throw new Error(
			`Поля ${invalidatedFields.join(', ')} обязательны для заполнения`
		)
	} else {
		next()
	}
})

import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc Get data from table
// @route GET /api/admin/:table/
// @access Public

export const getDataTable = asyncHandler(async (req, res) => {
	try {
		const { table } = req.params

		if (table === 'admin') {
			res.status(401)
			throw new Error('Данная таблица запрещена к изменению')
		}

		if (!prisma[table]) {
			res.status(404)
			throw new Error('Данная таблица не найдена')
		}

		const data = await prisma[table].findMany({
			orderBy: {
				id: 'asc'
			}
		})

		res.status(200).json(data ? data : [])
	} catch (error) {
		res.status(404)
		throw new Error(error)
	}
})

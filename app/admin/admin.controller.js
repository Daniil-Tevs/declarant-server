import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { getStructureTable } from '../utils/table.utils.js'

// @desc Get data from table
// @route GET /api/admin/:table/
// @access Private

export const getDataTable = asyncHandler(async (req, res) => {
	try {
		const { table } = req.params

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

// @desc Add element to table
// @route GET /api/admin/:table/
// @access Private

export const addElement = asyncHandler(async (req, res) => {
	try {
		const { table } = req.params
		console.log(table)

		const element = await prisma[table].create({ data: req.body })

		if (!element) {
			res.status(400)
			throw new Error(`Элемент не был добавлен`)
		}

		res.status(200).json(element ? element : false)
	} catch (error) {
		res.status(404)
		throw new Error(error)
	}
})

// @desc Update element in table
// @route PUT /api/admin/:table/:id/
// @access Private

export const updateElement = asyncHandler(async (req, res) => {
	try {
		let { id, table } = req.params

		const fields = getStructureTable(table)

		if (fields.id.type === 'Int') id = +id

		Object.keys(fields).forEach(field => {
			if (field != 'id' && fields[field].type === 'Int' && req.body[field])
				req.body[field] = +req.body[field]
		})

		if (fields.id.type === 'Int' && req.body.id) delete req.body.id

		const element = await prisma[table].update({
			data: req.body ? req.body : {},
			where: {
				id: id
			}
		})

		res.status(200).json(element ? element : false)
	} catch (error) {
		res.status(404)
		throw new Error(error)
	}
})

// @desc Remove element from table
// @route GET /api/admin/:table/:id/
// @access Private

export const removeElement = asyncHandler(async (req, res) => {
	try {
		const { id, table } = req.params

		const fields = getStructureTable(table)

		if (fields.id.type === 'Int') id = +id

		const element = await prisma[table].delete({
			where: { id }
		})

		res.status(200).json(element ? element : false)
	} catch (error) {
		res.status(404)
		throw new Error(error)
	}
})

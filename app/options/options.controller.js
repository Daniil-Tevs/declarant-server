import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc Get options
// @route POST /api/options/
// @access Public

export const getOptions = asyncHandler(async (req, res) => {
	try {
		const options = {}
		const optionsSource = await prisma.options.findMany()

		optionsSource.forEach(option => {
			options[option.name] = option.value
		})
		res.status(200).json(options)
	} catch (error) {
		res.status(404)
		throw new Error(error)
	}
})

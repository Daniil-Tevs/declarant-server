import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { cache } from '../utils/cache.utils.js'

// @desc Get options
// @route POST /api/options/
// @access Public

export const getOptions = asyncHandler(async (req, res) => {
	try {
		const data = cache.get('options.json')
		if (data) {
			res.status(200).json(data)
		} else {
			const options = {}
			const optionsSource = await prisma.options.findMany()

			optionsSource.forEach(option => {
				options[option.name] = option.value
			})

			cache.set('options.json', 216000, options)
			res.status(200).json(options)
		}
	} catch (error) {
		res.status(404)
		throw new Error(error)
	}
})

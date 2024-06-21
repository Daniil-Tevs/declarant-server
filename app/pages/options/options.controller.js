import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// @desc Get options by page
// @route GET /api/page/:page/
// @access Public

export const getOptionsByPage = asyncHandler(async (req, res) => {
	const { page } = req.params

	try {
		const options = {}
		const optionsSource = await prisma.optionspage.findMany({
			orderBy: {
				sort: 'asc'
			},
			where: {
				activity: true,
				pages: { id: page }
			},
			select: {
				name: true,
				value: true
			}
		})
		optionsSource.forEach(option => {
			options[option.name] = option.value
		})
		res.status(200).json(options)
	} catch (error) {
		res.status(404)
		throw new Error(error)
	}
})

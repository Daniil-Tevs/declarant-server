import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'
import { cache } from '../../utils/cache.utils.js'

// @desc Get options by page
// @route GET /api/page/:page/
// @access Public

export const getOptionsByPage = asyncHandler(async (req, res) => {
	const { page } = req.params

	try {
		const data = cache.get(`pages/${page}.json`)
		if (data) {
			console.log('cache')
			res.status(200).json(data)
		} else {
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
			console.log('not cache')

			if (Object.keys(options).length > 0) {
				cache.set(`pages/${page}.json`, 216000, options)
			}
			res.status(200).json(options)
		}
	} catch (error) {
		res.status(404)
		throw new Error(error)
	}
})

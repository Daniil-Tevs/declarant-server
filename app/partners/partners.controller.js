import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc Get options
// @route POST /api/partners/
// @access Public

export const getPartners = asyncHandler(async (req, res) => {
	try {
		const partners = await prisma.partners.findMany({
			orderBy: {
				sort: 'asc'
			},
			where: {
				activity: true
			},
			select: {
				id: true,
				logo: true,
				name: true,
				description: true,
				link: true
			}
		})
		res.status(200).json(partners ? partners : [])
	} catch (error) {
		res.status(404)
		throw new Error(error)
	}
})

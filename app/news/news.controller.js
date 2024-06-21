import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc Get news list
// @route POST /api/news/
// @access Public

export const getNewsList = asyncHandler(async (req, res) => {
	try {
		const newsList = await prisma.news.findMany({
			orderBy: {
				sort: 'asc'
			},
			where: {
				activity: true
			},
			select: {
				id: true,
				title: true,
				description: true,
				source: true,
				link: true,
				date: true
			}
		})
		res.status(200).json(newsList ? newsList : [])
	} catch (error) {
		res.status(404)
		throw new Error(error)
	}
})

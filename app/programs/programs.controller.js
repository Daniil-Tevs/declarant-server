import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc Get all programs
// @route GET /api/program/
// @access Public

export const getProgramList = asyncHandler(async (req, res) => {
	try {
		const programs = await prisma.programs.findMany({
			orderBy: { sort: 'asc' },
			where: { activity: true },
			select: {
				id: true,
				name: true,
				description: true
			}
		})

		res.status(200).json(programs ? programs : [])
	} catch (error) {
		res.status(404)
		throw new Error(error)
	}
})

// @desc Get program by id
// @route GET /api/program/:id/
// @access Public

export const getProgram = asyncHandler(async (req, res) => {
	const id = +req.params.id
	try {
		const program = await prisma.programs.findFirst({
			where: { id },
			select: {
				id: true,
				name: true,
				description: true
			}
		})

		res.status(200).json(program ?? false)
	} catch (error) {
		res.status(404)
		throw new Error(error)
	}
})

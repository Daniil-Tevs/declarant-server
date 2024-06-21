import 'colors'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import { errorHandler, notFound } from './app/middleware/error.middleware.js'

import appointmentRoute from './app/appointment/appointment.routes.js'
import optionsRoute from './app/options/options.routes.js'
import pagesRoute from './app/pages/pages.routes.js'
import partnersRoute from './app/partners/partners.routes.js'
import { prisma } from './app/prisma.js'
import programsRoute from './app/programs/programs.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

async function main() {
	if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

	app.use(cors())
	app.use(express.json())

	app.use('/api/page', pagesRoute)
	app.use('/api/options', optionsRoute)
	app.use('/api/programs', programsRoute)
	app.use('/api/partners', partnersRoute)
	app.use('/api/appointment', appointmentRoute)

	app.use(notFound, errorHandler)

	app.listen(PORT, () =>
		console.log(
			`Server running on mode ${process.env.NODE_ENV} port ${PORT}`.blue.bold
		)
	)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})

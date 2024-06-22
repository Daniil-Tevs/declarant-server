import Router from 'express'

import authRoute from './auth/auth.routes.js'

import { getDataTable } from './admin.controller.js'

const router = Router()

router.use('/auth', authRoute)

router.route('/:table').get(getDataTable)

export default router

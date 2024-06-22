import Router from 'express'

import authRoute from './auth/auth.routes.js'

import { auth } from '../middleware/auth.middleware.js'
import {
	availableTable,
	existTable,
	validateParams
} from '../middleware/table.middleware.js'
import {
	addElement,
	getDataTable,
	removeElement,
	updateElement
} from './admin.controller.js'

const router = Router()

router.use('/auth', authRoute)

router
	.route('/:table')
	.get(auth, existTable, availableTable, getDataTable)
	.post(auth, existTable, availableTable, validateParams, addElement)

router
	.route('/:table/:id')
	.put(auth, existTable, availableTable, updateElement)
	.delete(auth, existTable, availableTable, removeElement)

export default router

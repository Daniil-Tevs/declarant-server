import Router from 'express'

import { addAppointment } from './appointment.controller.js'

const router = Router()

router.route('/').post(addAppointment)

export default router

import Router from 'express'

import { login } from './auth.controller.js'

const router = Router()

router.route('/login').post(login)

export default router

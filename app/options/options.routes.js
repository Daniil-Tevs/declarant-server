import Router from 'express'

import { getOptions } from './options.controller.js'

const router = Router()

router.route('/').get(getOptions)

export default router

import Router from 'express'

import { getOptionsByPage } from './options.controller.js'

const router = Router()

router.route('/:page/').get(getOptionsByPage)

export default router

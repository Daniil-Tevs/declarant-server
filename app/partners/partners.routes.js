import Router from 'express'

import { getPartners } from './partners.controller.js'

const router = Router()

router.route('/').get(getPartners)

export default router

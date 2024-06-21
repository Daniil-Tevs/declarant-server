import Router from 'express'

import { getNewsList } from './news.controller.js'

const router = Router()

router.route('/').get(getNewsList)

export default router

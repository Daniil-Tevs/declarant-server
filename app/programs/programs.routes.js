import Router from 'express'

import { getProgram, getProgramList } from './programs.controller.js'

const router = Router()

router.route('/').get(getProgramList)
router.route('/:id/').get(getProgram)

export default router

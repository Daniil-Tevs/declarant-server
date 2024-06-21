import Router from 'express'
import optionsRouter from './options/options.routes.js'

const router = Router()

router.use('/options/', optionsRouter)

export default router

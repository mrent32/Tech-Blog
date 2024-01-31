import express from 'express'
import apiRoutes from './api/index.js'
import homeRoutes from './home-routes.js'
const router = express.Router()


router.use('/api', apiRoutes)
router.use('/', homeRoutes)

export default router;
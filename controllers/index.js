import router from ('express').Router()
import apiRoutes from ('./api')
import homeRoutes from ('./home-routes')

router.use('/api', apiRoutes)
router.use('/', homeRoutes)

module.exports = router;
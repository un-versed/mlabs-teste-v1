const router = require('express').Router()
const ParkingController = require('../../controllers/Http/Parking')
const auth = require('../auth')

router.post('/', ParkingController.store)
router.put('/:reserveNumber/out', ParkingController.left)
router.put('/:reserveNumber/pay', ParkingController.pay)
router.get('/:plate', ParkingController.indexByPlate)

module.exports = router

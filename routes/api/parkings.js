const router = require('express').Router()
const ParkingController = require('../../controllers/Http/Parking')

/**
 * Store a Parking Reservation
 * POST parkings
 */
router.post('/', ParkingController.store)
/**
 * Left a Parking Reservation
 * PUT parkings/:reserveNumber/out
 */
router.put('/:reserveNumber/out', ParkingController.left)
/**
 * Pay a Parking Reservation
 * PUT parkings/:reserveNumber/pay
 */
router.put('/:reserveNumber/pay', ParkingController.pay)
/**
 * List all Parking Reservations by Plate
 * GET parkings/:plate
 */
router.get('/:plate', ParkingController.indexByPlate)
/**
 * List all Parking Reservations
 * GET parkings
 */
router.get('/', ParkingController.index)

module.exports = router

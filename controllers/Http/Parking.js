/**
 * Resourceful controller for interacting with USERS
 */
const Validator = require('../../services/Validator')
const Joi = require('joi')
const mongoose = require('mongoose')
const Parking = mongoose.model('Parking')
const plateValidation = require('./../../services/Validator/attr/plate')

class ParkingController {
  /**
   * List all Parking Reservations by Plate
   * GET parkings/:plate
   */
  async indexByPlate (req, res, next) {
    try {
      const plate = req.params.plate

      // Check if reserveNumber is set
      if (!plate) {
        return res.status(400).json({ error: 'A placa informada não é válida.' })
      }

      // Get Parking object
      const parkingHistory = await Parking.find({ plate })

      return res.json(parkingHistory)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Store a Parking Reservation
   * POST parkings
   */
  async store (req, res, next) {
    try {
      new Validator({
        plate: Joi.string().max(8).custom(plateValidation).required().label('Placa do veículo')
      }).validate(req, res, next)

      const { plate } = req.body

      // Set the reserve number
      const reserveNumber = await ParkingController.generateReserveNumber()

      // Create Parking object
      const parking = new Parking({ plate, reserveNumber })
      await parking.save()

      return res.json(parking.toJSON())
    } catch (error) {
      next(error)
    }
  }

  /**
   * Pay a Parking Reservation
   * PUT parkings/:reserveNumber/pay
   */
  async pay (req, res, next) {
    try {
      const reserveNumber = req.params.reserveNumber

      // Check if reserveNumber is set
      if (!reserveNumber) {
        return res.status(400).json({ error: 'A reserva informada não é válida.' })
      }

      // Get Parking object
      const parking = await Parking.findOne({ reserveNumber })

      // Check if Parking was paid
      if (parking.paid) {
        return res.status(402).json({ error: 'Essa reserva já foi paga.' })
      }

      // Set new values
      parking.paid = true

      await parking.save()

      return res.json(parking.toJSON())
    } catch (error) {
      next(error)
    }
  }

  /**
   * Left a Parking Reservation
   * PUT parkings/:reserveNumber/out
   */
  async left (req, res, next) {
    try {
      const reserveNumber = req.params.reserveNumber

      // Check if reserveNumber is set
      if (!reserveNumber) {
        return res.status(400).json({ error: 'A reserva informada não é válida.' })
      }

      // Get Parking object
      const parking = await Parking.findOne({ reserveNumber })

      // Check if Parking was paid
      if (!parking.paid) {
        return res.status(402).json({ error: 'Você deve pagar o estacionamento antes de sair.' })
      }

      // Continue if parking was paid
      const leftAt = parking.getLeftAt()

      // Set new values
      parking.leftAt = leftAt
      parking.left = true

      // Set permanence time
      const permanenceTime = parking.permanenceTime(parking.enteredAt, parking.leftAt)

      parking.time = permanenceTime

      await parking.save()

      return res.json(parking.toJSON())
    } catch (error) {
      next(error)
    }
  }

  static async generateReserveNumber () {
    const reserveNumber = Math.floor(Math.random() * 1000000)
    const parking = await Parking.findOne({ reserveNumber })

    if (parking) return (await ParkingController.generateReserveNumber())
    if (!parking) return reserveNumber
  }
}

module.exports = new ParkingController()

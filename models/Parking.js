const mongoose = require('mongoose')
const { DateTime } = require('luxon')

const ParkingSchema = new mongoose.Schema({
  plate: { type: String, required: [true, 'não pode estar vazio'], match: [/^[a-zA-Z]{3}-[0-9]{4}\b/, 'está inválida'] },
  reserveNumber: { type: Number },
  paid: { type: Boolean, default: false },
  left: { type: Boolean, default: false },
  enteredAt: { type: Date, default: Date.now },
  leftAt: { type: Date },
  time: { type: String, default: null }
}, { timestamps: true })

ParkingSchema.methods.getLeftAt = function () {
  const today = new Date()

  return today
}

ParkingSchema.methods.permanenceTime = function (enteredAt, leftAt) {
  enteredAt = DateTime.fromJSDate(enteredAt)
  leftAt = DateTime.fromJSDate(leftAt)

  // Get time diff
  let permanenceTime = leftAt.diff(enteredAt, ['minutes', 'hours', 'days'])

  // Check diffs
  if (permanenceTime.minutes < 59) {
    permanenceTime = Math.floor(permanenceTime.minutes)
    return `${permanenceTime} minuto${((permanenceTime > 1) ? 's' : '')}`
  } else if (permanenceTime.hours < 23) {
    permanenceTime = permanenceTime.hours
    return `${permanenceTime} hora${((permanenceTime > 1) ? 's' : '')}`
  } else {
    permanenceTime = permanenceTime.days
    return `${permanenceTime} dia${((permanenceTime > 1) ? 's' : '')}`
  }
}

ParkingSchema.methods.toJSON = function () {
  return {
    plate: this.plate,
    reserveNumber: this.reserveNumber,
    paid: this.paid,
    left: this.left,
    enteredAt: this.enteredAt,
    leftAt: this.leftAt || null,
    time: this.time || null
  }
}

mongoose.model('Parking', ParkingSchema)

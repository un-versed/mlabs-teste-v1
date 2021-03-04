const mongoose = require('mongoose')

const ParkingSchema = new mongoose.Schema({
  plate: { type: String, required: [true, 'não pode estar vazio'], match: [/^[a-zA-Z]{3}-[0-9]{4}\b/, 'está inválida'] },
  reserveNumber: { type: Number },
  paid: { type: Boolean, default: false },
  left: { type: Boolean, default: false },
  enteredAt: { type: Date, default: Date.now },
  leftAt: { type: Date }
}, { timestamps: true })

ParkingSchema.methods.getLeftAt = function () {
  const today = new Date()

  return today
}

ParkingSchema.methods.toJSON = function () {
  return {
    plate: this.plate,
    reserveNumber: this.reserveNumber,
    paid: this.paid,
    left: this.left,
    enteredAt: this.enteredAt,
    leftAt: this.leftAt || null
  }
}

mongoose.model('Parking', ParkingSchema)

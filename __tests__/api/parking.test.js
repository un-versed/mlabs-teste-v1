const app = require('./../../app')
const supertest = require('supertest')
const request = supertest(app)
let reserveNumber = null
const mongoose = require('mongoose')

afterAll(async done => {
  mongoose.disconnect()
  done()
})

it('gets the root endpoint', async done => {
  const response = await request.get('/')

  expect(response.status).toBe(200)

  expect(response.body).toMatchObject({ title: 'mLabs Teste API v1' })
  done()
})

it('blocks user wrong plate reservation', async done => {
  const response = await request.post('/api/parkings').send({
    plate: 'ABC-123'
  })

  expect(response.status).toBe(422)

  expect(response.body).toMatchObject({
    error: 'Placa do veículo precisa ser válida',
    code: 'E_VALIDATION'
  })
  done()
})

it('create parking reservation', async done => {
  const response = await request.post('/api/parkings').send({
    plate: 'ABC-1234'
  })
  expect(response.status).toBe(200)

  expect(response.body).toHaveProperty('plate')
  expect(response.body).toHaveProperty('reserveNumber')
  expect(response.body).toHaveProperty('paid')
  expect(response.body).toHaveProperty('left')
  expect(response.body).toHaveProperty('enteredAt')
  expect(response.body).toHaveProperty('leftAt')
  expect(response.body).toHaveProperty('time')

  // Set reserve number for next test
  reserveNumber = response.body.reserveNumber
  done()
})

it('block multiple reservation for same plate', async done => {
  const response = await request.post('/api/parkings').send({
    plate: 'ABC-1234'
  })
  expect(response.status).toBe(422)

  expect(response.body).toMatchObject({
    error: 'Já existe uma reserva para a placa informada.'
  })
  done()
})

it('block a registered car but not paid yet to leave', async done => {
  const response = await request.put(`/api/parkings/${reserveNumber}/out`)

  expect(response.status).toBe(402)

  expect(response.body).toMatchObject({
    error: 'Você deve pagar o estacionamento antes de sair.'
  })
  done()
})

it('pay a parking reservation', async done => {
  const response = await request.put(`/api/parkings/${reserveNumber}/pay`)
  expect(response.status).toBe(200)

  expect(response.body).toHaveProperty('plate')
  expect(response.body).toHaveProperty('reserveNumber')
  expect(response.body).toHaveProperty('paid')
  expect(response.body).toHaveProperty('left')
  expect(response.body).toHaveProperty('enteredAt')
  expect(response.body).toHaveProperty('leftAt')
  expect(response.body).toHaveProperty('time')
  done()
})

it('block paying an already paid parking reservation', async done => {
  const response = await request.put(`/api/parkings/${reserveNumber}/pay`)
  expect(response.status).toBe(422)

  expect(response.body).toMatchObject({
    error: 'Essa reserva já foi paga.'
  })
  done()
})

it('leave a parking reservation', async done => {
  const response = await request.put(`/api/parkings/${reserveNumber}/out`)
  expect(response.status).toBe(200)

  expect(response.body).toHaveProperty('plate')
  expect(response.body).toHaveProperty('reserveNumber')
  expect(response.body).toHaveProperty('paid')
  expect(response.body).toHaveProperty('left')
  expect(response.body).toHaveProperty('enteredAt')
  expect(response.body).toHaveProperty('leftAt')
  expect(response.body).toHaveProperty('time')

  done()
})

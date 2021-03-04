const app = require('./../../app')
const supertest = require('supertest')
const request = supertest(app)

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
  done()
})

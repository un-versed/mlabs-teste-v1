const app = require('../../app')
const supertest = require('supertest')
const request = supertest(app)
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

it('block user wrong email upon register', async done => {
  const response = await request.post('/api/users').send({
    email: 'darth_vader@empire_test.com',
    password: 'padme1234_test',
    username: 'theDarthVader_test'
  })
  expect(response.status).toBe(422)

  expect(response.body).toMatchObject({ error: 'E-mail inválido', code: 'E_VALIDATION' })
  done()
})

it('register user', async done => {
  const response = await request.post('/api/users').send({
    email: 'darth_vader_test@empire.com',
    password: 'padme1234_test',
    username: 'theDarthVaderTest'
  })
  expect(response.status).toBe(200)

  expect(response.body).toHaveProperty('username')
  expect(response.body).toHaveProperty('email')
  expect(response.body).toHaveProperty('token')
  done()
})

it('block wrong credentials login', async done => {
  const response = await request.post('/api/users/login').send({
    email: 'darth_vader_test2@empire.com',
    password: 'padme1234_test'
  })
  expect(response.status).toBe(401)

  expect(response.body).toMatchObject({
    error: 'E-mail ou senha inválidos'
  })
  done()
})

it('logins user', async done => {
  const response = await request.post('/api/users/login').send({
    email: 'darth_vader_test@empire.com',
    password: 'padme1234_test'
  })
  expect(response.status).toBe(200)

  expect(response.body).toHaveProperty('username')
  expect(response.body).toHaveProperty('email')
  expect(response.body).toHaveProperty('token')
  done()
})

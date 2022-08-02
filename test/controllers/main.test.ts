import main from '../../src/controllers/main'

import express from 'express'
import request from 'supertest'
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use('/main', main)

describe('Main router', () => {
  it('GET /main', async () => {
    await request(app)
      .get('/main')
      .expect('Content-Type', /text\/html/)
      .expect('Hello World!')
      .expect(200)
  })
})

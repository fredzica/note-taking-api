import notes from '../../src/controllers/notes'

import express from 'express'
import request from 'supertest'

import { closeDb, initDb } from '../../src/services/db'

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use('/notes', notes)

beforeEach(() => {
  initDb()
})

afterEach(() => {
  closeDb()
})

describe('Notes router', () => {
  test('GET /notes', async () => {
    await request(app)
      .get('/notes')
      .expect('Content-Type', /text\/html/)
      .expect('Hello World!')
      .expect(200)
  })
})

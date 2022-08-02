import notes from '../../src/controllers/notes'

import express from 'express'
import request from 'supertest'

import { deleteAllTables, initDb } from '../../src/services/db'
import { createNote, findNote } from '../../src/db/note'
import NoteDTO from '../../src/dto/NoteDTO'

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use('/notes', notes)

beforeEach(() => {
  return initDb()
})

afterEach(() => {
  return deleteAllTables()
})

describe('Notes router', () => {
  it('GET /notes, empty return', async () => {
    await request(app)
      .get('/notes')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect([])
      .expect(200)
  })

  it('GET /notes, 2 notes', async () => {
    const note1Id = createNote(1, 'a nice note')
    const note2Id = createNote(1, 'a beautiful note')

    const note1 = findNote(note1Id)
    const note2 = findNote(note2Id)
    if (!note1 || !note2) {
      fail('the inserted notes were not found')
    }

    const response = await request(app)
      .get('/notes')
      .set('Accept', 'application/json')

    console.log(response.body)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.status).toEqual(200)

    expect(response.body).toContainEqual<NoteDTO>(note1)
    expect(response.body).toContainEqual<NoteDTO>(note2)
    expect(response.body).toHaveLength(2)
  })
})

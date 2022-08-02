import notes from '../../src/controllers/notes'

import express from 'express'
import request from 'supertest'
import bodyParser from 'body-parser'

import { deleteAllTables, initDb } from '../../src/services/db'
import { createNote, findNote, findUserNotes } from '../../src/db/note'
import NoteDTO from '../../src/dto/NoteDTO'

const app = express()
app.use(bodyParser.json())
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

    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.status).toEqual(200)

    expect(response.body).toContainEqual<NoteDTO>(note1)
    expect(response.body).toContainEqual<NoteDTO>(note2)
    expect(response.body).toHaveLength(2)
  })

  it('POST /notes, missing note field', async () => {
    await request(app)
      .post('/notes')
      .send({ wrong: 'element' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
  })

  it('POST /notes, creates a note', async () => {
    const response = await request(app)
      .post('/notes')
      .send({ note: 'a simple note' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)

    // since the user is known and will have only one note,
    // the below query is safe for now
    const notes = findUserNotes(1)
    expect(response.body).toEqual<NoteDTO>(notes[0])
  })

  it('PUT /notes, incorrect id field', async () => {
    const response = await request(app)
      .put('/notes/text')
      .send({ note: 'a note' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    console.log(response.body)
  })

  it('PUT /notes, missing note field', async () => {
    const note1Id = createNote(1, 'in a more serious note')

    const response = await request(app)
      .put(`/notes/${note1Id}`)
      .send({ wrong: 'element' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    console.log(response.body)
  })

  it('PUT /notes, unexistent note', async () => {
    const response = await request(app)
      .put(`/notes/10000`)
      .send({ note: 'a note' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)

    console.log(response.body)
  })
})

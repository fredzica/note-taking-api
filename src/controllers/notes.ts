import express from 'express'
import { createNote, findNote, findUserNotes } from '../db/note'
import { verifyAuth } from '../middleware/auth'

const router = express.Router()

router.get('/', verifyAuth, async (req, res) => {
  const userId = res.locals.user.id
  const userNotes = findUserNotes(userId)

  res.send(userNotes)
})

router.post('/', verifyAuth, async (req, res) => {
  const note = req.body.note
  if (!note) {
    res.status(400).send({ error: "The 'note' field is incorrect or missing" })
    return
  }

  const userId = res.locals.user.id
  const noteId = createNote(userId, note)
  const createdNote = findNote(noteId)
  res.status(201).send(createdNote)
})

router.put('/:id', verifyAuth, async (req, res) => {
  const id = req.params['id']
  if (!id || !Number.parseInt(id)) {
    res.status(400).send({ error: "The 'id' field is incorrect or missing" })
    return
  }
  const note = req.body.note
  if (!note) {
    res.status(400).send({ error: "The 'note' field is incorrect or missing" })
    return
  }

  // const userId = res.locals.user.id
  // const noteId = createNote(userId, note)
  // const updatedNote = findNote(noteId)
  // res.status(200).send(updatedNote)
  res.status(200).send({})
})

export default router

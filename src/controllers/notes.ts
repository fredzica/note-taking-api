import express from 'express'
import { findUserNotes } from '../db/note'
import { verifyAuth } from '../middleware/auth'

const router = express.Router()

router.get('/', verifyAuth, (req, res) => {
  const userId = res.locals?.user?.id
  const userNotes = userId ? findUserNotes(userId) : []

  res.send(userNotes)
})

export default router

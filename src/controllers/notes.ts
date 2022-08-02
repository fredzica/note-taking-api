import express from 'express'
import { verifyAuth } from '../middleware/auth'

const router = express.Router()

router.get('/', verifyAuth, (req, res) => {
  res.send('Hello World!')

  console.log('from locals', res.locals.user)
})

export default router

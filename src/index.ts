import express from 'express'

import { initDb } from './services/db'
import main from './controllers/main'

const app = express()
const port = process.env.PORT || 3000

app.use('/main', main)

/**
 * Initializes the application and its parts.
 */
const init = async () => {
  await initDb()

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

init()

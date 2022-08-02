import express from 'express'
import bodyParser from 'body-parser'

import { closeDb, initDb } from './services/db'
import notes from './controllers/notes'

// doing the app initialization
const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.json())
app.use('/v1/notes', notes)

initDb()
process.on('exit', () => closeDb())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

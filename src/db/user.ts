import { RunResult } from 'sqlite3'
import { db } from '../services/db'

interface UserDTO {
  id: number
  username: string
  password: string
  createdAt: Date
  updatedAt: Date
}

async function findUser(
  id: number,
  callback: (err: Error, row: RunResult) => void,
) {
  const stmt = await db.prepare('SELECT * FROM USER WHERE id = ?')
  await stmt.get(id, callback).finalize()
}

export { findUser }

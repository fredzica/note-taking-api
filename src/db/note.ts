import NoteDTO from '../dto/NoteDTO'
import { db } from '../services/db'

/**
 * Creates a note.
 * @param userId The user id.
 * @param note The note text.
 * @returns The rowid of the created note
 */
function createNote(userId: number, note: string): number | bigint {
  const stmt = db.prepare(
    `INSERT INTO note(user_id, note, created_at) VALUES (?,?,?)`,
  )
  const result = stmt.run(userId, note, Date.now())
  return result.lastInsertRowid
}

/**
 * Finds a note by its id.
 * @param id The note id.
 * @returns The note or null if not found.
 */
function findNote(id: number | bigint): NoteDTO | null {
  const stmt = db.prepare('SELECT * FROM note WHERE id = ?')
  const dbNote = stmt.get(id)
  if (dbNote) {
    return {
      id: dbNote.id,
      note: dbNote.note,
      createdAt: dbNote.created_at,
      updatedAt: dbNote.updated_at,
    }
  }

  return null
}

export { createNote, findNote }

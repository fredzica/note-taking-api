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
 * Updates a note.
 * @param id The note id.
 * @param note The note text.
 * @returns If a note was updated
 */
function updateNote(id: number, note: string): boolean {
  const stmt = db.prepare(
    `UPDATE note SET note = :note, updated_at = :updatedAt where id = :id`,
  )
  const result = stmt.run({ note, id, updatedAt: Date.now() })

  if (result.changes > 1) {
    throw new Error(
      `Somehow the update on a note with id ${id}
      resulted in many rows updated. Please check what happened`,
    )
  }

  return result.changes === 1
}

/**
 * Finds a note by its id.
 * @param id The note id.
 * @returns The note or null if not found.
 */
function findNote(id: number | bigint): NoteDTO | null {
  const stmt = db.prepare('SELECT * FROM note WHERE id = ?')
  const dbNote = stmt.get(id)

  return dbNote ? convertDbNoteToDTO(dbNote) : null
}

/**
 * Finds notes of a user.
 * @param userId The user id.
 * @returns The notes or an empty array if none were found.
 */
function findUserNotes(userId: number | bigint): NoteDTO[] {
  const stmt = db.prepare('SELECT * FROM note WHERE user_id = ?')
  const dbNotes = stmt.all(userId)

  return dbNotes.map(convertDbNoteToDTO)
}

/**
 * Finds a note by its id and its user.
 * @param id The note id.
 * @param userId The note id.
 * @returns The note or null if not found.
 */
function findNoteByIdAndUser(id: number, userId: number): NoteDTO | null {
  const stmt = db.prepare(
    'SELECT * FROM note WHERE id = :id and user_id = :userId',
  )

  const dbNote = stmt.get({ id, userId })
  return dbNote ? convertDbNoteToDTO(dbNote) : null
}

function convertDbNoteToDTO(dbNote: {
  id: number
  note: string
  created_at: Date
  updated_at: Date
}): NoteDTO {
  return {
    id: dbNote.id,
    note: dbNote.note,
    createdAt: dbNote.created_at,
    updatedAt: dbNote.updated_at,
  }
}

export { createNote, findNote, updateNote, findUserNotes, findNoteByIdAndUser }

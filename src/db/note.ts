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
 * @param userId The user id.
 * @param note The note text.
 * @returns If a note was updated
 */
function updateNoteByIdAndUser(
  id: number,
  userId: number,
  note: string,
): boolean {
  const stmt = db.prepare(
    `UPDATE note SET note = :note, updated_at = :updatedAt WHERE id = :id AND user_id = :userId`,
  )
  const result = stmt.run({ note, id, userId, updatedAt: Date.now() })

  if (result.changes > 1) {
    throw new Error(
      `Somehow the update on a note with id ${id} and userId ${userId}
      resulted in many rows updated. Please check what happened`,
    )
  }

  return result.changes === 1
}

/**
 * Deletes a note.
 * @param id The note id.
 * @param userId The user id.
 * @returns If a note was updated
 */
function deleteNoteByIdAndUser(id: number, userId: number): boolean {
  const stmt = db.prepare(
    `DELETE FROM note WHERE id = :id AND user_id = :userId`,
  )
  const result = stmt.run({ id, userId })

  if (result.changes > 1) {
    throw new Error(
      `Somehow the delete on a note with id ${id} and userId ${userId}
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
  const stmt = db.prepare(
    'SELECT * FROM note WHERE user_id = ? ORDER BY created_at DESC',
  )
  const dbNotes = stmt.all(userId)

  return dbNotes.map(convertDbNoteToDTO)
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

export {
  createNote,
  findNote,
  updateNoteByIdAndUser,
  deleteNoteByIdAndUser,
  findUserNotes,
}

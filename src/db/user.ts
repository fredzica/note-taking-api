import { db } from '../services/db'
import UserDTO from '../dto/UserDTO'

/**
 * Finds an user by its id.
 * @param id The user id.
 * @returns The user or null if not found.
 */
function findUser(id: number): UserDTO | null {
  const stmt = db.prepare('SELECT * FROM USER WHERE id = ?')
  const dbUser = stmt.get(id)
  if (dbUser) {
    return {
      id: dbUser.id,
      username: dbUser.username,
      passwordHash: dbUser.password_hash,
      createdAt: dbUser.created_at,
      updatedAt: dbUser.updated_at,
    }
  }

  return null
}

export { findUser }

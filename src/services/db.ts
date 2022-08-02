import sqlite3 from 'sqlite3'
sqlite3.verbose()
const db = new sqlite3.Database(':memory:')

/**
 * Creates the DB tables and first rows.
 */
const initDb = async () => {
  // ensures serial, in-order execution of SQL
  db.serialize(() => {
    db.run(`
    CREATE TABLE user(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP
    )`)

    db.run(`
    CREATE TABLE note(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      note TEXT NOT NULL,
      created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES user(id)
    )`)

    db.run(`
    INSERT INTO user(
      username, password
    )
    VALUES(
      'test1',
      'pass'
    )`)

    db.run(`
    INSERT INTO user(
      username, password
    )
    VALUES(
      'test2',
      'pass'
    )`)
  })
}

export { initDb, db }

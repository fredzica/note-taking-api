import Database from 'better-sqlite3'
const db = new Database(':memory:', { verbose: console.log })

/**
 * Creates the DB tables and first rows.
 */
async function initDb() {
  // ensures serial, in-order execution of SQL
  db.exec(`
    CREATE TABLE user(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP
    )`)

  db.exec(`
    CREATE TABLE note(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      note TEXT NOT NULL,
      created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES user(id)
    )`)

  db.exec(`
    INSERT INTO user(
      username, password_hash
    )
    VALUES(
      'test1',
      '$2a$12$iNO5ixBuMZw9uuiSJPQmQ.SUV6.U66iPH4o4SPWPhDAzsA.HwBAry'
    )`)

  db.exec(`
    INSERT INTO user(
      username, password_hash
    )
    VALUES(
      'test2',
      '$2a$12$xqlLLF1lBvNaDUQD9POTx./ziqzgJ2yvPvMlX47JmLWQGBgUPXga2'
    )`)
}

export { initDb, db }

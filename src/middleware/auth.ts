import express from 'express'
import { RunResult } from 'sqlite3'

import { findUser } from '../db/user'

export async function verifyAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const callback = (err: Error, row: RunResult) => {
    console.log('callback', row)
    res.locals.user = row

    next()
  }
  const user = await findUser(1, callback)
}

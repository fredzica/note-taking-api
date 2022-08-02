import express from 'express'

import { findUser } from '../db/user'

export async function verifyAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const user = findUser(1)
  res.locals.user = user

  next()
}

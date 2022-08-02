import express from 'express'

import { findUser } from '../db/user'

/**
 * Express middleware function to check if the user is authenticated
 * and forward user info inside res.locals.
 *
 * ATTENTION: This is just a draft of the actual implementation, which would
 * check for a JWT token on the Authentication HTTP header, verify its
 * signature and retrieve the user from it.
 * @param req The express request
 * @param res The express response
 * @param next The next function in the middleware chain
 */
export async function verifyAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  /*
    TODO: find the JWT in the Authentication HTTP header,
    verify its signature, retrieve and forward the user.
    If the token is not present or is invalid, send a 401 response.
  */

  const user = findUser(1)
  res.locals.user = user

  next()
}

import { Router, Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    if (authHeader) {
      /*
      const decoded = jwt.verify(authHeader, req.app.locals.JWT_SECRET, (err) => {
        if (err) return res.status(403).json({ success: false, message: 'Unauthenticated' })
      })
      */
      const decoded = jwt.verify(authHeader, req.app.locals.JWT_SECRET)
      const userID = decoded?.id || '';
      res.locals.userID = userID;
      return next()
    }

    return res.status(403).json({ success: false, message: 'Unauthenticated' })
  } catch (e) {
    return res.status(403).json({ success: false, message: 'Unauthenticated' })
  }

}
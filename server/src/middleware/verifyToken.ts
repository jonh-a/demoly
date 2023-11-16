import { Router, Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

export default (req: Request, res: Response, next: NextFunction) => {
  console.log('verifyToken middleware')
  try {
    const { access_token = '' } = req.cookies;
    if (!access_token) {
      return res.status(403).json({ success: false, message: 'Unauthenticated' })
    }

    const userID = JSON.parse(access_token)?.id || ''
    res.locals.userID = userID
    return next()
  } catch (e) {
    return res.status(403).json({ success: false, message: 'Unauthenticated' })
  }

}
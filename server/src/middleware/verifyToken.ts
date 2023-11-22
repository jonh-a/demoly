import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token = '' } = req.cookies;
    if (!access_token) {
      return res.status(403).json({ success: false, message: 'Unauthenticated' });
    }

    const decodedToken = jwt.verify(access_token, req.app.locals?.JWT_SECRET);

    const userID = decodedToken?.id || '';
    res.locals.userID = userID;
    return next();
  } catch (e) {
    return res.status(403).json({ success: false, message: 'Unauthenticated' });
  }
};
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  email: string;
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export default function currentUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const user = jwt.verify(req.session?.jwt, '1224') as UserPayload;
    req.currentUser = user;
  } catch (err) {
    res.status(401).send({ currentUser: null });
  }
  next();
}

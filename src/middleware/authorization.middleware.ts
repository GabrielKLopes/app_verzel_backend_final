import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NextFunction, Response, Request } from 'express';

dotenv.config();

interface CustomRequest extends Request {
  user_id?: number;
}

const secretJWT = process.env.JWT_SECRET_KEY || '';
export function authorizationMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ message: "Token missing or malformed" });
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    const decoded = Jwt.verify(token, secretJWT) as Jwt.JwtPayload;

    if (!decoded || typeof decoded.user_id !== 'number') {
      return res.status(401).send({ message: "Invalid token payload" });
    }

    req.user_id = decoded.user_id;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Invalid or expired token" });
  }
}

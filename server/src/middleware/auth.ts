// TODO: verify the token exists and add the user data to the request object
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // Extend Request to include a user property
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from the Authorization header

  if (!token) {
    res.sendStatus(401); // Unauthorized if token is not present
    return; // Ensure to exit the function here
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, user) => {
    if (err) {
      res.sendStatus(403); // Forbidden if token is invalid
      return; // Ensure to exit the function here
    }

    req.user = user as JwtPayload; // Attach the user payload to the request object
    next(); // Call the next middleware or route handler
  });
};

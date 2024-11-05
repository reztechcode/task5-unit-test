import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Menggunakan kunci rahasia dari variabel lingkungan
const secretKey = process.env.JWT_SECRET;

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(403).json({ message: 'Token is required' });
    return;
  }

  if (!secretKey) {
    res.status(500).json({ message: 'Secret key is not defined' });
    return;
  }

  jwt.verify(token, secretKey as string, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    (req as any).user = decoded; 
    next(); // Lanjutkan ke middleware berikutnya
  });
};

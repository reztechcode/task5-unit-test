import { Request, Response, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/User';

const secretKey = process.env.JWT_SECRET || 'default_secret'; // Pastikan Anda telah mengatur ini di .env

export const register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    res.status(400).json({ message: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = new User({ username, password: hashedPassword });
  
  await newUser.save();
  res.status(201).json({ message: 'User registered successfully' });
};

// Fungsi untuk login
export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const token = jwt.sign({ id: user._id, username: user.username }, secretKey, {
    expiresIn: '1h',
  });

  res.json({ token });
};


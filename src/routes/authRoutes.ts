import { Router } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();

// Rute untuk registrasi pengguna
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register New User
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registrasi Berhasil Di lakukan
 */
router.post('/register', register);

// Rute untuk login pengguna
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login User
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registrasi Berhasil Di lakukan
 */
router.post('/login', login);

export default router;

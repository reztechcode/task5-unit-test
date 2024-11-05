import { Router } from 'express';
import { createBook, getBooks, getBookById, updateBook, deleteBook } from '../controllers/BookController';
import { verifyToken } from '../middlewares/authMiddleware'

const router = Router();

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Tambah buku baru
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       201:
 *         description: Buku berhasil ditambahkan
 */
router.post('/', verifyToken , createBook);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Mendapatkan semua buku
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Daftar buku
 */
router.get('/' , getBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Mendapatkan detail buku berdasarkan ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID buku
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detail buku
 *       404:
 *         description: Buku tidak ditemukan
 */
router.get('/:id', getBookById);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Memperbarui buku berdasarkan ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID buku
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Buku berhasil diperbarui
 *       404:
 *         description: Buku tidak ditemukan
 */
router.put('/:id', verifyToken, updateBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Menghapus buku berdasarkan ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID buku
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Buku berhasil dihapus
 *       404:
 *         description: Buku tidak ditemukan
 */
router.delete('/:id', verifyToken, deleteBook);

export default router;

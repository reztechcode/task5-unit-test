import { Request, Response, NextFunction } from 'express';
import { createBook, getBooks, getBookById, updateBook, deleteBook } from '../src/controllers/BookController';
import Book from '../src/models/Book';

jest.mock('../src/models/Book');

describe('Book Controller', () => {

  it('Test Create Book', async () => {
    const req = {
      body: { title: 'Test Book', author: 'Author' },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as unknown as NextFunction;  // Tambahkan next

    Book.prototype.save = jest.fn().mockResolvedValue(req.body);

    await createBook(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it('Get All Data Book', async () => {
    const req = {} as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as unknown as NextFunction;  // Tambahkan next

    const mockBooks = [{ title: 'Test Book', author: 'Author' }];
    Book.find = jest.fn().mockResolvedValue(mockBooks);

    await getBooks(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockBooks);
  });

  it('Get Data Book By ID', async () => {
    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as unknown as NextFunction;  // Tambahkan next

    const mockBook = { title: 'Test Book', author: 'Author' };
    Book.findById = jest.fn().mockResolvedValue(mockBook);

    await getBookById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockBook);
  });

  it('Update Data Book By ID', async () => {
    const req = { params: { id: '1' }, body: { title: 'Updated Book' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as unknown as NextFunction;  // Tambahkan next

    const mockUpdatedBook = { title: 'Updated Book', author: 'Author' };
    Book.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdatedBook);

    await updateBook(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUpdatedBook);
  });

  it('Delete Data Book By ID', async () => {
    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as unknown as NextFunction;  // Tambahkan next

    const mockDeletedBook = { title: 'Deleted Book', author: 'Author' };
    Book.findByIdAndDelete = jest.fn().mockResolvedValue(mockDeletedBook);

    await deleteBook(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Book deleted successfully' });
  });

});

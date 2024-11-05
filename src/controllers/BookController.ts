import { Request, Response, RequestHandler } from 'express';
import Book, { IBook } from '../models/Book';

// Create a new book
export const createBook: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const newBook: IBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error });
  }
};

// Get all books
export const getBooks: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};

// Get a single book by ID
export const getBookById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error });
  }
};

// Update a book by ID
export const updateBook: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error });
  }
};

// Delete a book by ID
export const deleteBook: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error });
  }
};

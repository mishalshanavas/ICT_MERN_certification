const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET /api/books - Get all books with optional search/filter
router.get('/', async (req, res) => {
    try {
        const { search, genre, author } = req.query;
        let query = {};

        // Build search query
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { author: { $regex: search, $options: 'i' } },
                { genre: { $regex: search, $options: 'i' } }
            ];
        }

        if (genre) {
            query.genre = { $regex: genre, $options: 'i' };
        }

        if (author) {
            query.author = { $regex: author, $options: 'i' };
        }

        const books = await Book.find(query).sort({ createdAt: -1 });
        
        // Calculate stats
        const totalBooks = books.length;
        const outOfStockBooks = books.filter(book => book.stock === 0).length;

        res.status(200).json({
            success: true,
            data: books,
            stats: {
                totalBooks,
                outOfStockBooks
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching books',
            error: error.message
        });
    }
});

// GET /api/books/:id - Get single book
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        res.status(200).json({
            success: true,
            data: book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching book',
            error: error.message
        });
    }
});

// POST /api/books - Add new book
router.post('/', async (req, res) => {
    try {
        const { title, author, genre, price, stock, publishedYear } = req.body;

        // Validation
        if (!title || !author || !genre || !price) {
            return res.status(400).json({
                success: false,
                message: 'Title, author, genre, and price are required'
            });
        }

        const book = new Book({
            title,
            author,
            genre,
            price,
            stock: stock || 0,
            publishedYear
        });

        const savedBook = await book.save();

        res.status(201).json({
            success: true,
            message: 'Book added successfully',
            data: savedBook
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error adding book',
            error: error.message
        });
    }
});

// PUT /api/books/:id - Update book
router.put('/:id', async (req, res) => {
    try {
        const { title, author, genre, price, stock, publishedYear } = req.body;

        const book = await Book.findById(req.params.id);
        
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        // Update fields
        if (title) book.title = title;
        if (author) book.author = author;
        if (genre) book.genre = genre;
        if (price !== undefined) book.price = price;
        if (stock !== undefined) book.stock = stock;
        if (publishedYear) book.publishedYear = publishedYear;

        const updatedBook = await book.save();

        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating book',
            error: error.message
        });
    }
});

// DELETE /api/books/:id - Delete book
router.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        await Book.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting book',
            error: error.message
        });
    }
});

module.exports = router;
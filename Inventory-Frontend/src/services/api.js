import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const bookService = {
    // Get all books with optional search/filter
    getBooks: (searchParams = {}) => {
        const params = new URLSearchParams(searchParams);
        return api.get(`/books?${params}`);
    },

    // Get single book
    getBook: (id) => {
        return api.get(`/books/${id}`);
    },

    // Add new book
    createBook: (bookData) => {
        return api.post('/books', bookData);
    },

    // Update book
    updateBook: (id, bookData) => {
        return api.put(`/books/${id}`, bookData);
    },

    // Delete book
    deleteBook: (id) => {
        return api.delete(`/books/${id}`);
    },
};

export default api;
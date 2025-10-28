import React, { useState, useEffect } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
  AppBar,
  Toolbar,
  IconButton,
  Card,
  CardContent,
  Stack,
  Chip,
  Fade,
} from '@mui/material';
import {
  Add,
  Search,
  DarkMode,
  LightMode,
  LibraryBooks,
  Inventory2Outlined,
  TrendingDownOutlined,
  FilterList,
  ViewModule,
} from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createAppTheme } from './theme/theme';
import { bookService } from './services/api';
import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';
import EditBookModal from './components/EditBookModal';
import DeleteConfirmationPopup from './components/DeleteConfirmationPopup';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({ totalBooks: 0, outOfStockBooks: 0 });
  
  // Modal states
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  
  // Operation loading states
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const theme = createAppTheme(isDarkMode);

  // Load books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle search with debounce
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm.trim()) {
        fetchBooks({ search: searchTerm });
      } else {
        fetchBooks();
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  const fetchBooks = async (searchParams = {}) => {
    try {
      setLoading(true);
      const response = await bookService.getBooks(searchParams);
      setBooks(response.data.data);
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching books:', error);
      toast.error('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (bookData) => {
    try {
      setAddLoading(true);
      await bookService.createBook(bookData);
      toast.success('Book added successfully!');
      setAddModalOpen(false);
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
      toast.error(error.response?.data?.message || 'Failed to add book');
    } finally {
      setAddLoading(false);
    }
  };

  const handleEditBook = async (id, bookData) => {
    try {
      setEditLoading(true);
      await bookService.updateBook(id, bookData);
      toast.success('Book updated successfully!');
      setEditModalOpen(false);
      setSelectedBook(null);
      fetchBooks();
    } catch (error) {
      console.error('Error updating book:', error);
      toast.error(error.response?.data?.message || 'Failed to update book');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      setDeleteLoading(true);
      await bookService.deleteBook(id);
      toast.success('Book deleted successfully!');
      setDeleteModalOpen(false);
      setSelectedBook(null);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error(error.response?.data?.message || 'Failed to delete book');
    } finally {
      setDeleteLoading(false);
    }
  };

  const openEditModal = (book) => {
    setSelectedBook(book);
    setEditModalOpen(true);
  };

  const openDeleteModal = (book) => {
    setSelectedBook(book);
    setDeleteModalOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: theme.palette.background.default,
        fontFamily: theme.typography.fontFamily 
      }}>
        {/* Notion-style Header */}
        <AppBar position="static" elevation={0}>
          <Toolbar sx={{ 
            justifyContent: 'space-between',
            minHeight: '60px !important',
            px: 3
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5,
                cursor: 'pointer',
                p: 0.5,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: theme.palette.grey[100]
                }
              }}>
                <LibraryBooks sx={{ 
                  fontSize: '1.5rem',
                  color: theme.palette.text.primary
                }} />
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    color: theme.palette.text.primary,
                    fontSize: '1rem'
                  }}
                >
                  Book Inventory
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={() => setIsDarkMode(!isDarkMode)}
                size="small"
                sx={{ 
                  color: theme.palette.text.secondary,
                  '&:hover': { 
                    backgroundColor: theme.palette.grey[100],
                    color: theme.palette.text.primary
                  }
                }}
              >
                {isDarkMode ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ py: 3, px: 3 }}>
          {/* Page Header */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700, 
                mb: 1,
                color: theme.palette.text.primary,
                fontSize: '2rem'
              }}
            >
              📚 Inventory
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: theme.palette.text.secondary,
                mb: 3
              }}
            >
              Manage your book collection with ease
            </Typography>

            {/* Stats Row */}
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <Chip
                icon={<Inventory2Outlined />}
                label={`${stats.totalBooks} Total Books`}
                variant="outlined"
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.grey[300]}`,
                  '& .MuiChip-icon': {
                    color: theme.palette.text.secondary
                  }
                }}
              />
              <Chip
                icon={<TrendingDownOutlined />}
                label={`${stats.outOfStockBooks} Out of Stock`}
                variant="outlined"
                color={stats.outOfStockBooks > 0 ? "warning" : "default"}
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.grey[300]}`,
                  '& .MuiChip-icon': {
                    color: stats.outOfStockBooks > 0 ? theme.palette.warning.main : theme.palette.text.secondary
                  }
                }}
              />
            </Stack>
          </Box>

          {/* Notion-style Toolbar */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                sx={{ 
                  minWidth: 300,
                  '& .MuiOutlinedInput-root': {
                    height: '36px'
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ 
                        color: theme.palette.text.secondary,
                        fontSize: '1.1rem'
                      }} />
                    </InputAdornment>
                  ),
                }}
              />
              
              <IconButton 
                size="small"
                sx={{ 
                  border: `1px solid ${theme.palette.grey[300]}`,
                  borderRadius: 1,
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    backgroundColor: theme.palette.grey[100]
                  }
                }}
              >
                <FilterList fontSize="small" />
              </IconButton>
              
              <IconButton 
                size="small"
                sx={{ 
                  border: `1px solid ${theme.palette.grey[300]}`,
                  borderRadius: 1,
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    backgroundColor: theme.palette.grey[100]
                  }
                }}
              >
                <ViewModule fontSize="small" />
              </IconButton>
            </Box>
            
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setAddModalOpen(true)}
              sx={{ 
                borderRadius: 1.5,
                textTransform: 'none',
                fontWeight: 500,
                px: 2,
                height: '36px',
                fontSize: '0.875rem'
              }}
            >
              New
            </Button>
          </Box>

          {/* Book List with Notion-style Card */}
          <Card sx={{ 
            borderRadius: 2,
            border: `1px solid ${theme.palette.grey[300]}`,
            boxShadow: 'none',
            overflow: 'hidden'
          }}>
            <Fade in={true} timeout={600}>
              <div>
                <BookList
                  books={books}
                  onEdit={openEditModal}
                  onDelete={openDeleteModal}
                  loading={loading}
                />
              </div>
            </Fade>
          </Card>
        </Container>

        {/* Modals */}
        <AddBookForm
          open={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSubmit={handleAddBook}
          loading={addLoading}
        />

        <EditBookModal
          open={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedBook(null);
          }}
          onSubmit={handleEditBook}
          book={selectedBook}
          loading={editLoading}
        />

        <DeleteConfirmationPopup
          open={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setSelectedBook(null);
          }}
          onConfirm={handleDeleteBook}
          book={selectedBook}
          loading={deleteLoading}
        />

        {/* Toast Container */}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={isDarkMode ? 'dark' : 'light'}
          toastStyle={{
            borderRadius: '8px',
            fontSize: '0.875rem',
            padding: '12px 16px'
          }}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;

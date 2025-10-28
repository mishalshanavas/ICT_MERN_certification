import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Chip,
    Typography,
    Box,
    Tooltip,
    Avatar,
} from '@mui/material';
import { 
    EditOutlined, 
    DeleteOutline, 
    BookOutlined,
    Circle
} from '@mui/icons-material';

const BookList = ({ books, onEdit, onDelete, loading = false }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    const getStockStatus = (stock) => {
        if (stock === 0) {
            return { label: 'Out of Stock', color: '#eb5757', bgColor: '#fef2f2' };
        } else if (stock <= 5) {
            return { label: 'Low Stock', color: '#f2994a', bgColor: '#fef8f0' };
        } else {
            return { label: 'In Stock', color: '#27ae60', bgColor: '#f0fdf4' };
        }
    };

    const getGenreColor = (genre) => {
        const colors = {
            'Fiction': { color: '#2383e2', bgColor: '#eff6ff' },
            'Non-Fiction': { color: '#7c3aed', bgColor: '#f5f3ff' },
            'Science': { color: '#059669', bgColor: '#ecfdf5' },
            'History': { color: '#dc2626', bgColor: '#fef2f2' },
            'Biography': { color: '#ea580c', bgColor: '#fff7ed' },
            'Romance': { color: '#ec4899', bgColor: '#fdf2f8' },
            'Mystery': { color: '#374151', bgColor: '#f9fafb' },
            'Fantasy': { color: '#7c2d12', bgColor: '#fef7ed' },
        };
        return colors[genre] || { color: '#6b7280', bgColor: '#f9fafb' };
    };

    if (loading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: 200,
                color: 'text.secondary'
            }}>
                <Typography variant="body2">Loading books...</Typography>
            </Box>
        );
    }

    if (!books || books.length === 0) {
        return (
            <Box sx={{ 
                p: 6, 
                textAlign: 'center',
            }}>
                <BookOutlined sx={{ 
                    fontSize: 48, 
                    color: 'text.secondary', 
                    mb: 2,
                    opacity: 0.5
                }} />
                <Typography variant="h6" sx={{ color: 'text.primary', mb: 1, fontWeight: 500 }}>
                    No books yet
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Click "New" to add your first book to the inventory
                </Typography>
            </Box>
        );
    }

    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ 
                            fontWeight: 600, 
                            fontSize: '0.75rem',
                            color: 'text.secondary',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            py: 2,
                            borderBottom: '1px solid',
                            borderColor: 'grey.200'
                        }}>
                            Book
                        </TableCell>
                        <TableCell sx={{ 
                            fontWeight: 600, 
                            fontSize: '0.75rem',
                            color: 'text.secondary',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            py: 2,
                            borderBottom: '1px solid',
                            borderColor: 'grey.200'
                        }}>
                            Author
                        </TableCell>
                        <TableCell sx={{ 
                            fontWeight: 600, 
                            fontSize: '0.75rem',
                            color: 'text.secondary',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            py: 2,
                            borderBottom: '1px solid',
                            borderColor: 'grey.200'
                        }}>
                            Genre
                        </TableCell>
                        <TableCell sx={{ 
                            fontWeight: 600, 
                            fontSize: '0.75rem',
                            color: 'text.secondary',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            py: 2,
                            borderBottom: '1px solid',
                            borderColor: 'grey.200'
                        }}>
                            Price
                        </TableCell>
                        <TableCell sx={{ 
                            fontWeight: 600, 
                            fontSize: '0.75rem',
                            color: 'text.secondary',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            py: 2,
                            borderBottom: '1px solid',
                            borderColor: 'grey.200'
                        }}>
                            Stock
                        </TableCell>
                        <TableCell sx={{ 
                            fontWeight: 600, 
                            fontSize: '0.75rem',
                            color: 'text.secondary',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            py: 2,
                            borderBottom: '1px solid',
                            borderColor: 'grey.200'
                        }}>
                            Year
                        </TableCell>
                        <TableCell sx={{ 
                            fontWeight: 600, 
                            fontSize: '0.75rem',
                            color: 'text.secondary',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            py: 2,
                            textAlign: 'center',
                            borderBottom: '1px solid',
                            borderColor: 'grey.200'
                        }}>
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map((book, index) => {
                        const stockStatus = getStockStatus(book.stock);
                        const genreColor = getGenreColor(book.genre);
                        
                        return (
                            <TableRow 
                                key={book._id}
                                sx={{ 
                                    '&:hover': { 
                                        backgroundColor: 'grey.50'
                                    },
                                    borderBottom: '1px solid',
                                    borderColor: 'grey.100',
                                    '&:last-child': {
                                        borderBottom: 'none'
                                    }
                                }}
                            >
                                <TableCell sx={{ py: 2.5, px: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <Avatar
                                            sx={{
                                                width: 32,
                                                height: 32,
                                                backgroundColor: genreColor.bgColor,
                                                color: genreColor.color,
                                                fontSize: '0.875rem',
                                                fontWeight: 600
                                            }}
                                        >
                                            {book.title.charAt(0).toUpperCase()}
                                        </Avatar>
                                        <Box>
                                            <Typography 
                                                variant="body2" 
                                                sx={{ 
                                                    fontWeight: 500,
                                                    color: 'text.primary',
                                                    lineHeight: 1.4,
                                                    mb: 0.25
                                                }}
                                            >
                                                {book.title}
                                            </Typography>
                                            {book.publishedYear && (
                                                <Typography 
                                                    variant="caption" 
                                                    sx={{ 
                                                        color: 'text.secondary',
                                                        fontSize: '0.75rem'
                                                    }}
                                                >
                                                    Published {book.publishedYear}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ py: 2.5, px: 2 }}>
                                    <Typography variant="body2" sx={{ 
                                        color: 'text.primary',
                                        fontWeight: 400
                                    }}>
                                        {book.author}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ py: 2.5, px: 2 }}>
                                    <Chip 
                                        label={book.genre}
                                        size="small"
                                        sx={{
                                            backgroundColor: genreColor.bgColor,
                                            color: genreColor.color,
                                            border: 'none',
                                            fontSize: '0.75rem',
                                            height: 24,
                                            fontWeight: 500,
                                            '& .MuiChip-label': {
                                                px: 1
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ py: 2.5, px: 2 }}>
                                    <Typography variant="body2" sx={{ 
                                        fontWeight: 600,
                                        color: 'text.primary',
                                        fontFamily: 'monospace'
                                    }}>
                                        {formatPrice(book.price)}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ py: 2.5, px: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Circle sx={{ 
                                            fontSize: 8, 
                                            color: stockStatus.color 
                                        }} />
                                        <Typography variant="body2" sx={{ 
                                            color: 'text.primary',
                                            fontWeight: 500
                                        }}>
                                            {book.stock}
                                        </Typography>
                                        <Typography variant="caption" sx={{ 
                                            color: 'text.secondary',
                                            fontSize: '0.75rem'
                                        }}>
                                            units
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ py: 2.5, px: 2 }}>
                                    <Typography variant="body2" sx={{ 
                                        color: 'text.secondary',
                                        fontFamily: 'monospace'
                                    }}>
                                        {book.publishedYear || '—'}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ py: 2.5, px: 2, textAlign: 'center' }}>
                                    <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                                        <Tooltip title="Edit book" placement="top">
                                            <IconButton 
                                                size="small"
                                                onClick={() => onEdit(book)}
                                                sx={{ 
                                                    color: 'text.secondary',
                                                    '&:hover': { 
                                                        backgroundColor: 'grey.100',
                                                        color: 'primary.main'
                                                    }
                                                }}
                                            >
                                                <EditOutlined sx={{ fontSize: '1.1rem' }} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete book" placement="top">
                                            <IconButton 
                                                size="small"
                                                onClick={() => onDelete(book)}
                                                sx={{ 
                                                    color: 'text.secondary',
                                                    '&:hover': { 
                                                        backgroundColor: 'error.50',
                                                        color: 'error.main'
                                                    }
                                                }}
                                            >
                                                <DeleteOutline sx={{ fontSize: '1.1rem' }} />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BookList;
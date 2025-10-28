import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Grid,
    IconButton,
    Divider,
    Typography,
    Stack,
} from '@mui/material';
import { Close, BookmarkAdd } from '@mui/icons-material';

const AddBookForm = ({ open, onClose, onSubmit, loading = false }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        price: '',
        stock: '',
        publishedYear: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.author.trim()) newErrors.author = 'Author is required';
        if (!formData.genre.trim()) newErrors.genre = 'Genre is required';
        if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
            newErrors.price = 'Valid price is required';
        }
        if (formData.stock && (isNaN(formData.stock) || Number(formData.stock) < 0)) {
            newErrors.stock = 'Stock must be a positive number';
        }
        if (formData.publishedYear && (isNaN(formData.publishedYear) || Number(formData.publishedYear) < 1000 || Number(formData.publishedYear) > new Date().getFullYear() + 1)) {
            newErrors.publishedYear = 'Valid published year is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        const bookData = {
            ...formData,
            price: Number(formData.price),
            stock: formData.stock ? Number(formData.stock) : 0,
            publishedYear: formData.publishedYear ? Number(formData.publishedYear) : undefined,
        };

        onSubmit(bookData);
    };

    const handleClose = () => {
        setFormData({
            title: '',
            author: '',
            genre: '',
            price: '',
            stock: '',
            publishedYear: '',
        });
        setErrors({});
        onClose();
    };

    return (
        <Dialog 
            open={open} 
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: 3,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    border: '1px solid',
                    borderColor: 'grey.200',
                }
            }}
        >
            <DialogTitle sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                py: 3,
                px: 3,
                borderBottom: '1px solid',
                borderColor: 'grey.100'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <BookmarkAdd sx={{ 
                        color: 'primary.main',
                        fontSize: '1.5rem'
                    }} />
                    <Typography variant="h6" sx={{ 
                        fontWeight: 600,
                        color: 'text.primary'
                    }}>
                        Add New Book
                    </Typography>
                </Box>
                <IconButton 
                    onClick={handleClose}
                    size="small"
                    sx={{ 
                        color: 'text.secondary',
                        '&:hover': { 
                            backgroundColor: 'grey.100',
                            color: 'text.primary'
                        }
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            
            <DialogContent sx={{ p: 3 }}>
                <Typography variant="body2" sx={{ 
                    color: 'text.secondary', 
                    mb: 3,
                    lineHeight: 1.5
                }}>
                    Fill in the details below to add a new book to your inventory.
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            name="title"
                            label="Book Title"
                            placeholder="Enter the book title"
                            value={formData.title}
                            onChange={handleChange}
                            error={!!errors.title}
                            helperText={errors.title}
                            fullWidth
                            required
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    fontSize: '0.875rem'
                                }
                            }}
                        />
                        
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="author"
                                    label="Author"
                                    placeholder="Author name"
                                    value={formData.author}
                                    onChange={handleChange}
                                    error={!!errors.author}
                                    helperText={errors.author}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            fontSize: '0.875rem'
                                        }
                                    }}
                                />
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="genre"
                                    label="Genre"
                                    placeholder="e.g., Fiction, Science, History"
                                    value={formData.genre}
                                    onChange={handleChange}
                                    error={!!errors.genre}
                                    helperText={errors.genre}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            fontSize: '0.875rem'
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                        
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="price"
                                    label="Price"
                                    placeholder="0.00"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                    error={!!errors.price}
                                    helperText={errors.price}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    inputProps={{ min: 0, step: 0.01 }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            fontSize: '0.875rem'
                                        }
                                    }}
                                />
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="stock"
                                    label="Stock Quantity"
                                    placeholder="0"
                                    type="number"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    error={!!errors.stock}
                                    helperText={errors.stock}
                                    fullWidth
                                    variant="outlined"
                                    inputProps={{ min: 0 }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            fontSize: '0.875rem'
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                        
                        <TextField
                            name="publishedYear"
                            label="Published Year"
                            placeholder="e.g., 2023"
                            type="number"
                            value={formData.publishedYear}
                            onChange={handleChange}
                            error={!!errors.publishedYear}
                            helperText={errors.publishedYear}
                            fullWidth
                            variant="outlined"
                            inputProps={{ 
                                min: 1000, 
                                max: new Date().getFullYear() + 1 
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    fontSize: '0.875rem'
                                }
                            }}
                        />
                    </Stack>
                </Box>
            </DialogContent>
            
            <DialogActions sx={{ 
                p: 3, 
                pt: 2,
                borderTop: '1px solid',
                borderColor: 'grey.100',
                gap: 1
            }}>
                <Button 
                    onClick={handleClose}
                    variant="outlined"
                    sx={{ 
                        borderRadius: 1.5,
                        textTransform: 'none',
                        px: 2,
                        py: 1,
                        fontWeight: 500,
                        fontSize: '0.875rem'
                    }}
                >
                    Cancel
                </Button>
                <Button 
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={loading}
                    sx={{ 
                        borderRadius: 1.5,
                        textTransform: 'none',
                        px: 3,
                        py: 1,
                        fontWeight: 500,
                        fontSize: '0.875rem'
                    }}
                >
                    {loading ? 'Adding...' : 'Add Book'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddBookForm;
import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    IconButton,
    Stack,
} from '@mui/material';
import { Close, DeleteOutlined, WarningAmber } from '@mui/icons-material';

const DeleteConfirmationPopup = ({ open, onClose, onConfirm, book, loading = false }) => {
    const handleConfirm = () => {
        if (book) {
            onConfirm(book._id);
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: 3,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    border: '1px solid',
                    borderColor: 'grey.200',
                    maxWidth: '440px'
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
                    <WarningAmber sx={{ 
                        color: 'error.main',
                        fontSize: '1.5rem'
                    }} />
                    <Typography variant="h6" sx={{ 
                        fontWeight: 600,
                        color: 'text.primary'
                    }}>
                        Delete Book
                    </Typography>
                </Box>
                <IconButton 
                    onClick={onClose}
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
                <Stack spacing={2}>
                    <Typography variant="body1" sx={{ 
                        color: 'text.primary',
                        fontWeight: 500,
                        lineHeight: 1.5
                    }}>
                        Are you sure you want to delete this book?
                    </Typography>
                    
                    {book && (
                        <Box sx={{ 
                            backgroundColor: 'grey.50',
                            borderRadius: 2,
                            p: 2.5,
                            border: '1px solid',
                            borderColor: 'grey.200'
                        }}>
                            <Typography variant="body2" sx={{ 
                                color: 'text.secondary',
                                fontSize: '0.75rem',
                                textTransform: 'uppercase',
                                fontWeight: 600,
                                letterSpacing: '0.5px',
                                mb: 1
                            }}>
                                Book Details
                            </Typography>
                            
                            <Typography variant="h6" sx={{ 
                                color: 'text.primary',
                                fontWeight: 600,
                                mb: 0.5,
                                fontSize: '1rem'
                            }}>
                                {book.title}
                            </Typography>
                            
                            <Typography variant="body2" sx={{ 
                                color: 'text.secondary',
                                mb: 1,
                                fontSize: '0.875rem'
                            }}>
                                by {book.author}
                            </Typography>
                            
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <Typography variant="body2" sx={{ 
                                    color: 'text.secondary',
                                    fontSize: '0.75rem'
                                }}>
                                    Genre: <span style={{ fontWeight: 500, color: 'inherit' }}>{book.genre}</span>
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                    color: 'text.secondary',
                                    fontSize: '0.75rem'
                                }}>
                                    Stock: <span style={{ fontWeight: 500, color: 'inherit' }}>{book.stock}</span>
                                </Typography>
                            </Box>
                        </Box>
                    )}
                    
                    <Typography variant="body2" sx={{ 
                        color: 'error.main',
                        lineHeight: 1.5,
                        fontSize: '0.875rem',
                        fontWeight: 500
                    }}>
                        ⚠️ This action cannot be undone. The book will be permanently removed from your inventory.
                    </Typography>
                </Stack>
            </DialogContent>
            
            <DialogActions sx={{ 
                p: 3, 
                pt: 2,
                borderTop: '1px solid',
                borderColor: 'grey.100',
                gap: 1
            }}>
                <Button 
                    onClick={onClose}
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
                    onClick={handleConfirm}
                    variant="contained"
                    color="error"
                    disabled={loading}
                    startIcon={<DeleteOutlined />}
                    sx={{ 
                        borderRadius: 1.5,
                        textTransform: 'none',
                        px: 3,
                        py: 1,
                        fontWeight: 500,
                        fontSize: '0.875rem'
                    }}
                >
                    {loading ? 'Deleting...' : 'Delete Book'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationPopup;
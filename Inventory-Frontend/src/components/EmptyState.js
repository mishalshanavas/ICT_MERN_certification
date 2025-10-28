import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add, MenuBook } from '@mui/icons-material';

const EmptyState = ({ onAddBook }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 300,
                textAlign: 'center',
                p: 4,
                borderRadius: 3,
                border: '2px dashed',
                borderColor: 'grey.300',
                backgroundColor: 'grey.50',
            }}
        >
            <MenuBook 
                sx={{ 
                    fontSize: 64, 
                    color: 'grey.400', 
                    mb: 2 
                }} 
            />
            <Typography 
                variant="h5" 
                sx={{ 
                    fontWeight: 600, 
                    color: 'grey.700',
                    mb: 1 
                }}
            >
                No books in your inventory
            </Typography>
            <Typography 
                variant="body1" 
                sx={{ 
                    color: 'grey.500',
                    mb: 3,
                    maxWidth: 400
                }}
            >
                Start building your book collection by adding your first book to the inventory.
            </Typography>
            <Button
                variant="contained"
                startIcon={<Add />}
                onClick={onAddBook}
                sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    px: 3,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '1rem'
                }}
            >
                Add Your First Book
            </Button>
        </Box>
    );
};

export default EmptyState;
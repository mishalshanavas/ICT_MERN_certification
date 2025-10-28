import React from 'react';
import { Container, Typography, Button } from '@mui/material';

function SimpleApp() {
  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>
        Book Inventory Test
      </Typography>
      <Button variant="contained" color="primary">
        Test Button
      </Button>
    </Container>
  );
}

export default SimpleApp;
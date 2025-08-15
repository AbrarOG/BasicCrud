'use client';

import { Card, CardMedia, CardContent, Typography, Button, Box, Tooltip } from '@mui/material';
import { Book } from '../types/book';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        transition: 'transform 0.2s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': { transform: 'scale(1.03)', boxShadow: 6 },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        // Using a placeholder image for now
        image="/placeholder-book.jpg"
        alt={book.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Tooltip title={book.title}>
          <Typography variant="h6" fontWeight="bold" noWrap>
            {book.title}
          </Typography>
        </Tooltip>

        <Typography variant="body2" color="text.secondary" noWrap>
          {book.author}
        </Typography>

        <Typography variant="caption" color="text.secondary" display="block" noWrap>
          {book.publisher}
        </Typography>

        {/* Availability Badge */}
        <Box
          mt={1}
          mb={1}
          sx={{
            backgroundColor: book.availableCopies > 0 ? '#e8f5e9' : '#ffebee',
            color: book.availableCopies > 0 ? '#388e3c' : '#d32f2f',
            px: 1.5,
            py: 0.3,
            borderRadius: 2,
            fontSize: '0.8rem',
            display: 'inline-block',
            fontWeight: 'bold',
          }}
        >
          {book.availableCopies > 0
            ? `${book.availableCopies} Available`
            : 'Out of Stock'}
        </Box>

        {/* Short description preview */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mt: 1,
          }}
        >
          {book.description}
        </Typography>
      </CardContent>

      {/* Action Button */}
      <Box p={2} pt={0}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#1565c0' },
            textTransform: 'none',
            borderRadius: 2,
          }}
          fullWidth
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
}

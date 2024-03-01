import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const BookItem = ({ book, onEdit, onDelete }: any) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Author: {book.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Genre: {book.genre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {book.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onEdit(book)}>
          Edit
        </Button>
        <Button size="small" onClick={() => onDelete(book.id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default BookItem;

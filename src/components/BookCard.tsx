import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Book } from "./types/Book";
import { Button, CardActions } from "@mui/material";

const BookCard = ({
  book,
  handleEditClick,
  handleDeleteClick,
}: {
  book: Book;
  handleEditClick: any;
  handleDeleteClick: any;
}) => {
  return (
    <Card
      sx={{
        width: 300,
        margin: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <CardContent>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          {book.title}
        </Typography>
        <Typography component="div">{book.author}</Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Genre: {book.genre}
        </Typography>
        <Typography variant="body2">{book.description}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => handleEditClick(book)} size="small">
          Edit
        </Button>
        <Button
          onClick={() => handleDeleteClick(book)}
          size="small"
          color="error"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default BookCard;

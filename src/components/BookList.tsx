import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import { deleteBook, fetchBooks } from "../global/apiService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
} from "@mui/material";
import { Book } from "./types/Book";
import BookForm from "./BookForm";
import "../index.css";
import FilterDropdown from "./FilterDropdown";
import BookCard from "./BookCard";

const BookList = () => {
  const { data: books, error } = useSWR("books", fetchBooks);
  const [open, setOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [view, setView] = useState("list");

  const toggleView = (selectedView: any) => {
    setView(selectedView);
  };

  const handleOpenNewBookForm = () => {
    setIsAdding(true);
    setSelectedBook({
      title: "",
      author: "",
      genre: "",
      description: "",
    } as Book);
    setOpen(true);
  };

  const handleDeleteClick = (book: Book) => {
    setBookToDelete(book);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const confirmDelete = async () => {
    if (bookToDelete) {
      await onDelete(bookToDelete.id);
      setBookToDelete(null);
      handleCloseDeleteDialog();
    }
  };

  const onDelete = async (bookId: any) => {
    await deleteBook(bookId);
    mutate("books");
    handleClose();
  };

  const handleRowClick = (book: Book) => {
    setIsAdding(false);
    setSelectedBook(book);
    setOpen(true);
    setDeleteDialogOpen(false);
  };

  const handleClose = () => {
    setIsAdding(false);
    setOpen(false);
    setTimeout(() => {
      setSelectedBook(null);
    }, 150);
  };

  const listView = (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">Genre</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books?.map((book: Book) => (
            <TableRow key={book.id} hover>
              <TableCell component="th" scope="row">
                {book.title}
              </TableCell>
              <TableCell align="right">{book.author}</TableCell>
              <TableCell align="right">{book.genre}</TableCell>
              <TableCell align="right">{book.description}</TableCell>
              <TableCell align="right">
                <Button onClick={() => handleRowClick(book)}>Edit</Button>
                <Button onClick={() => handleDeleteClick(book)} color="error">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const bookCards = (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      {books?.map((book: Book) => (
        <BookCard
          book={book}
          handleEditClick={handleRowClick}
          handleDeleteClick={handleDeleteClick}
        />
      ))}
    </Box>
  );

  if (error) return <div>Failed to load</div>;
  if (!books) return <div>Loading...</div>;

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenNewBookForm}
        style={{ margin: "20px" }}
      >
        Add New Book
      </Button>
      <FilterDropdown value={view} onChange={toggleView} />
      {view === "list" ? listView : bookCards}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="book-details-dialog"
      >
        <BookForm
          open={open}
          handleClose={handleClose}
          book={isAdding ? null : selectedBook}
        />
      </Dialog>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this book?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookList;

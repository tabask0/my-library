import React from "react";
import { useFormik } from "formik";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { BookFormProps } from "./types/BookForm";
import { addBook, updateBook } from "../global/apiService";
import { mutate } from "swr";

const BookForm = ({ open, handleClose, book }: BookFormProps) => {
  const formik = useFormik({
    initialValues: {
      title: book?.title || "",
      author: book?.author || "",
      genre: book?.genre || "",
      description: book?.description || "",
    },
    onSubmit: async (values) => {
      if (book && book.id) {
        await updateBook(book.id, values);
      } else {
        await addBook(values);
      }
      mutate("books");
      handleClose();
      formik.resetForm();
    },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <form className="mt-10" onSubmit={formik.handleSubmit}>
        <DialogTitle>{book ? "Edit Book" : "Add New Book"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          <TextField
            margin="dense"
            id="author"
            label="Author"
            type="text"
            fullWidth
            variant="outlined"
            value={formik.values.author}
            onChange={formik.handleChange}
          />
          <TextField
            margin="dense"
            id="genre"
            label="Genre"
            type="text"
            fullWidth
            variant="outlined"
            value={formik.values.genre}
            onChange={formik.handleChange}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              formik.resetForm();
            }}
          >
            Cancel
          </Button>
          <Button type="submit">{book ? "Update" : "Save"}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BookForm;

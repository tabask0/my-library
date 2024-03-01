import { Book } from "./Book";

export interface BookFormProps {
  open: boolean;
  handleClose: () => void;
  onEdit?: (e: object) => void;
  onDelete?: (e: any) => void;
  book: Book;
}

import mongoose, { Schema, model } from "mongoose";
import { IBook } from "./product.interface";

// Define the schema for the Book collection
const BookSchema = new Schema<IBook>({
    title: {
      type: String,
      required: true
    },
    author: {
      type: [String],
      required: true
    },
    genre: {
      type: String,
      required: true
    },
    publicationYear: {
      type: Number,
      required: true
    },
    publisher: {
      name: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      }
    },
    reviews: {
      type: [{
        user: {
          type: String,
          required: true
        },
        comment: {
          type: String,
          required: true
        }
      }],
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    price: {
      type: String,
      required: true
    }
  });
 // export default Book = mongoose.model<IBook>("Book",BookSchema);

  // Create and export the Book model
  const Book = mongoose.model<IBook>('Book', BookSchema);
module.exports = Book;

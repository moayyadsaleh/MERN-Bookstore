import express from "express";
import { Book } from "../models/bookModel.js";
import mongoose from "mongoose"; // Import mongoose library

const router = express.Router();

//Since the app.use("/books", booksRoute) middleware is use, we don't have to specify the routes
//Route to save a new book

// Route to save a new book
router.post("/", async (req, res) => {
  try {
    // Check if required fields are missing in the request body
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).json({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    // Create a new book using the 'Book' model
    const newBook = new Book({
      // Use 'new Book' to create a new book instance
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    });

    await newBook.save(); // Save the new book to the database

    // Send a successful response with the created book data
    return res.status(201).json(newBook); // Return the new book data in the response
  } catch (error) {
    console.error(error.message);

    // Send an error response with a status code of 500 and the error message
    return res.status(500).json({ message: error.message });
  }
});

//Route to retrieve all books from DB

// Route to retrieve all books from the DB
router.get("/", async (req, res) => {
  try {
    // Use the 'find' method of the 'Book' model to retrieve all books
    const books = await Book.find();

    // Send a successful response with the list of books
    return res.status(200).json({
      cont: books.length,
      data: books,
    });
  } catch (error) {
    console.error(error.message); // Use console.error for error messages

    // Send an error response with a status code of 500 and the error message
    return res.status(500).json({ message: error.message });
  }
});

//Get a book by ID
// Get a book by ID
router.get("/:id", async (req, res) => {
  try {
    // Extract the book ID from the URL parameters
    const bookId = req.params.id;

    // Use the 'findById' method of the 'Book' model to retrieve a book by its ID
    const book = await Book.findById(bookId);

    // If the book is not found, return a 404 response
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    ///Send a successful response with the book data
    return res.status(200).json(book);
  } catch (error) {
    console.error(error.message); // Use console.error for error messages

    // Send an error response with a status code of 500 and the error message
    return res.status(500).json({ message: error.message });
  }
});

// Update a book by ID
router.put("/:id", async (req, res) => {
  try {
    // Extract the book ID from the URL parameters
    const { id } = req.params;

    // Check if the provided 'id' is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error(`Invalid ObjectId: ${id}`);
      return res.status(400).json({ message: "Invalid ObjectId format" });
    }

    // Check if required fields are missing in the request body
    if (!req.body.title && !req.body.author && !req.body.publishYear) {
      return res.status(400).json({
        message:
          "Send at least one field to update: title, author, publishYear",
      });
    }

    // Use the 'findByIdAndUpdate' method of the 'Book' model to update a book by its ID
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { ...req.body }, // Spread request body to update book fields
      { new: true } // Return the updated book
    );

    // If the book is not found, return a 404 response and log an error message
    if (!updatedBook) {
      console.error(`Book with ID ${id} not found`);
      return res.status(404).json({ message: "Book not found" });
    }

    // Send a successful response with the updated book data and a success message
    return res.status(200).json({
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    console.error(error.message); // Use console.error for error messages

    // Send an error response with a status code of 500 and the error message
    return res.status(500).json({ message: error.message });
  }
});

// Delete a book by ID
router.delete("/:id", async (req, res) => {
  try {
    // Extract the book ID from the URL parameters
    const { id } = req.params;

    // Check if the provided 'id' is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error(`Invalid ObjectId: ${id}`);
      return res.status(400).json({ message: "Invalid ObjectId format" });
    }

    // Use the 'findByIdAndDelete' method of the 'Book' model to delete the book by its ID
    const deletedBook = await Book.findByIdAndDelete(id);

    // If the book is not found, return a 404 response and log an error message
    if (!deletedBook) {
      console.error(`Book with ID ${id} not found`);
      return res.status(404).json({ message: "Book not found" });
    }

    // Send a successful response with a success message
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error.message); // Use console.error for error messages

    // Send an error response with a status code of 500 and the error message
    return res.status(500).json({ message: error.message });
  }
});

export default router;

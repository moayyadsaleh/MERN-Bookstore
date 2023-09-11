import express from "express";
import mongoose from "mongoose"; // Import mongoose library
import { Book } from "./models/bookModel.js";
import { PORT, uri } from "./config.js";
const app = express();
///Middleware to parse incoming request body
app.use(express.json());
app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to MERN Stack Tutorial");
});

//Route to save a new book
app.post("/books", async (req, res) => {
  try {
    // Check if required fields are missing in the request body
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).json({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    // Create a new book using the 'Book' model, not 'Books'
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook); // Use 'Book' instead of 'Books'

    // Send a successful response with the created book data
    return res.status(201).json(book);
  } catch (error) {
    console.error(error.message); // Use console.error for error messages

    // Send an error response with a status code of 500 and the error message
    return res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");

    // Assuming 'app' is your Express.js application instance
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

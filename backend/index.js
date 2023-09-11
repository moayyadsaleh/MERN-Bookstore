import express from "express";
import mongoose from "mongoose"; // Import mongoose library
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoutes.js";
import cors from "cors";
import { PORT, uri } from "./config.js";
const app = express();
///Middleware to parse incoming request body
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to MERN Stack Tutorial");
});
//Add middleware, for each books route, handle it with the booksRoute.
app.use("/books", booksRoute);
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

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import { useSnackbar } from "notistack";

const EditBooks = () => {
  const { id } = useParams(); // Get the book ID from the URL params
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Fetch the book data to pre-fill the form for editing
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        const { title, author, publishYear } = response.data;
        setTitle(title);
        setAuthor(author);
        setPublishYear(publishYear);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleUpdateBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);

    axios
      .put(`http://localhost:5555/books/${id}`, data) // Use PUT to update the book
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Edited successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.error(error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <BackButton />
      <h1 className="text-2xl font-semibold mb-4">Edit Book</h1>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title:
          </label>
          <input
            className="mt-1 p-2 border rounded-md w-full"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Author:
          </label>
          <input
            className="mt-1 p-2 border rounded-md w-full"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Publish Year:
          </label>
          <input
            className="mt-1 p-2 border rounded-md w-full"
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
          type="button"
          onClick={handleUpdateBook}
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBooks;

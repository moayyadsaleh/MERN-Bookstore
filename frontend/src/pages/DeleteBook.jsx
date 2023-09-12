import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";

const DeleteBook = () => {
  const { id } = useParams(); // Get the book ID from the URL params
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the book data to confirm the deletion
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while fetching book data.");
        setLoading(false);
      });
  }, [id]);

  const handleDeleteBook = () => {
    setLoading(true);

    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.error(error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <BackButton />
      <h1 className="text-2xl font-semibold mb-4">
        Delete Book: {book ? book.title : "Loading..."}
      </h1>
      {!loading && book ? (
        <div>
          <p>Are you sure you want to delete the book "{book.title}"?</p>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
            type="button"
            onClick={handleDeleteBook}
          >
            Delete Book
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DeleteBook;

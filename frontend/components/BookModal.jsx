import React from "react";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";

const BookModal = ({ book, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container bg-white w-96 mx-auto rounded-lg shadow-lg z-50">
        <div className="modal-header bg-gray-200 p-4 rounded-t-lg">
          <h2 className="text-xl font-semibold">{book.title}</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body p-4">
          <p className="text-gray-600">Author: {book.author}</p>
          <p className="text-gray-600">Publish Year: {book.publishYear}</p>
          {/* Add more book details here */}
          <div className="flex items-center gap-2 mt-4">
            <PiBookOpenTextLight className="text-red-300 text-2xl" />
            <BiUserCircle className="text-blue-500 text-2xl" />
            <AiOutlineEdit className="text-yellow-600 text-2xl" />
          </div>
        </div>
        <div className="modal-footer bg-gray-200 p-4 rounded-b-lg"></div>
      </div>
    </div>
  );
};

export default BookModal;

"use client";
import { postBook, putBook } from "@/app/services/bookService";
import { IBooks, NewBook } from "@/app/types/IBooks";
import React, { useState } from "react";

interface BooksProps {
  setData: React.Dispatch<React.SetStateAction<IBooks[]>>;
  setEditing: (id: boolean) => void;
  setAdding: (id: boolean) => void;
  id: string;
  adding: boolean;
}

const Book: React.FC<BooksProps> = ({
  setData,
  setAdding,
  setEditing,
  id,
  adding,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      console.log(title, author);

      if (title && author) {
        const newItem: NewBook = { title, author };

        const addedBook: IBooks = await postBook(newItem);

        console.log(addedBook);

        setData((prevData) => [...prevData, addedBook.Book]);

        setAdding(false);
        setTitle("");
        setAuthor("");
      } else {
        setError("Please fill in all fields.");
      }
    } catch (error: any) {
      setError(
        "Error adding shoe: " + (error.response?.data?.message || error.message)
      );
    }
  };

  const handleEditItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEditing(false);
    try {
      if (title && author) {
        const newItem: NewBook = { title, author };

        const myId = id;
        const addedBook: IBooks = await putBook(newItem, myId);
        console.log("addedBook", addedBook);

        setData((prevData) =>
          prevData.map((shoe) =>
            shoe._id === addedBook._id ? addedBook : shoe
          )
        );

        setAdding(false);
        setTitle("");
        setAuthor("");
      } else {
        setError("Please fill in all fields.");
      }
    } catch (error: any) {
      setError(
        "Error adding shoe: " + (error.response?.data?.message || error.message)
      );
    }
  };
  return (
    <div>
      <form
        onSubmit={adding ? handleAddItem : handleEditItem}
        className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg max-w-md w-full mx-auto"
      >
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
        >
          {adding ? "Add" : "Edit"} Book
        </button>
        {error && (
          <p className="mt-2 text-red-500 text-sm text-center">{error}</p>
        )}
      </form>
    </div>
  );
};

export default Book;

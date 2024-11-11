"use client";
import Card from "@/app/components/Card";
import { deleteBook, getAllBooks, postBook } from "@/app/services/bookService";
import { IBooks, NewBook } from "@/app/types/IBooks";
import React, { useEffect, useState } from "react";

const page: React.FC = () => {
  const [data, setData] = useState<IBooks[]>([]);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const dataBooks: IBooks[] = await getAllBooks();
        setData(dataBooks);
        console.log("books ", dataBooks);
      } catch (error) {
        console.error("Error fetching shoes:", error);
        setError("Error fetching shoes.");
      }
    };
    getData();
  }, []);

  const handleDelete = async (idToDel: string) => {
    console.log(idToDel);
    await deleteBook(idToDel);
    setData(data.filter((book) => book._id !== idToDel));
    setId("");
  };

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

  return (
    <div className="flex flex-wrap">
      <button
        onClick={() => setAdding(true)}
        className="w-[90%] align-center bg-pink-300 hover:bg-pink-400 m-1 text-white font-bold py-2 px-4 rounded-full"
      >
        +
      </button>

      {adding && (
        <form
          onSubmit={handleAddItem}
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
            Add Book
          </button>
          {error && (
            <p className="mt-2 text-red-500 text-sm text-center">{error}</p>
          )}
        </form>
      )}

      {data.map((book) => (
        <Card
          info={book}
          type={"books"}
          key={book._id}
          setEditing={setEditing}
          setId={setId}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default page;

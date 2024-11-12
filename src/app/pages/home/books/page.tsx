"use client";
import Card from "@/app/components/Card";
import Book from "@/app/components/inputs/Book";
import { deleteBook, getAllBooks } from "@/app/services/bookService";
import { IBooks, NewBook } from "@/app/types/IBooks";
import React, { useEffect, useState } from "react";

const page: React.FC = () => {
  const [data, setData] = useState<IBooks[]>([]);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);

  const [id, setId] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const dataBooks: IBooks[] = await getAllBooks();
        setData(dataBooks);
        console.log("books ", dataBooks);
      } catch (error) {
        console.error("Error fetching shoes:", error);
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

  return (
    <div className="flex flex-wrap">
      <button
        onClick={() => setAdding(true)}
        className="w-[90%] align-center bg-pink-300 hover:bg-pink-400 m-1 text-white font-bold py-2 px-4 rounded-full"
      >
        +
      </button>

      {adding && (
        <Book
          setData={setData}
          setAdding={setAdding}
          adding={true}
          setEditing={setEditing}
          id={id}
        />
      )}

      {data.map((book) =>
        editing && book._id === id ? (
          <Book
            setData={setData}
            setAdding={setAdding}
            adding={false}
            setEditing={setEditing}
            id={id}
          />
        ) : (
          <Card
            info={book}
            type={"books"}
            key={book._id}
            setEditing={setEditing}
            setId={setId}
            handleDelete={handleDelete}
          />
        )
      )}
    </div>
  );
};

export default page;

import axios from "axios";
import { IBooks, NewBook } from "../types/IBooks";

// export const getAllBooks = async (): Promise<IBooks[]> => {
//     const res = axios
//       .get("http://localhost:3000/api/books/get")
//       .then((response) => response.data)
//       .catch((error) => console.error(error));

//     return res;
//   };
export const getAllBooks = async (): Promise<IBooks[]> => {
  const res = await axios
    .get("http://localhost:3000/api/books/get")
    .then((response) => {
      console.log(response.data);

      return response.data.data;
    })
    .catch((error) => console.error(error));

  return res;
};

export const getBookById = async (): Promise<IBooks> => {
  const res = await axios
    .get("http://localhost:3000/api/books/get/:bookId")
    .then((response) => response.data)
    .catch((error) => console.error(error));

  return res;
};

export const postBook = async (newItem: NewBook) => {
  const res = await axios
    .post("http://localhost:3000/api/books/post", newItem)
    .then((response) => response.data)
    .catch((error) => console.error(error));

  return res;
};

export const putBook = async (newItem: NewBook, bookId: string) => {
  console.log("newItem", newItem);
  
  const res = await axios
    .put(`http://localhost:3000/api/books/put/${bookId}`, newItem)
    .then((response) => response.data.book)
    .catch((error) => console.error(error));

  return res;
};

export const deleteBook = async (bookId: string) => {
  const res = await axios
    .delete(`http://localhost:3000/api/books/delete/${bookId}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));

  return res;
};

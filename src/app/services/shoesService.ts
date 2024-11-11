import axios from "axios";
import { IShoes, NewShoe } from "../types/IShoes";

export const getAllShoes = async (): Promise<IShoes[]> => {
  const res = await axios
    .get("http://localhost:3000/api/shoes/get")
    .then((response) => {
      console.log(response.data);

      return response.data.data;
    })
    .catch((error) => console.error(error));

  return res;
};

export const getShoesById = async (): Promise<IShoes> => {
  const res = axios
    .get("http://localhost:3000/api/shoes/get/:shoesId")
    .then((response) => response.data)
    .catch((error) => console.error(error));

  return res;
};

export const postShoes = async (newItem: NewShoe) => {
  const res = await axios
    .post("http://localhost:3000/api/shoes/post", newItem)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => console.error(error));

  return res;
};

export const putShoes = async (newItem: NewShoe, shoesId: string) => {
  const res = await axios
    .put(`http://localhost:3000/api/shoes/put/${shoesId}`, newItem)
    .then((response) => {
      console.log(response);
      return response.data.shoes;
    })
    .catch((error) => console.error(error));

  return res;
};

export const deleteShoes = async (shoesId: string) => {
  console.log("before",shoesId);
  
  const res = await axios
    .delete(`http://localhost:3000/api/shoes/delete/${shoesId}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));

  return res;
};

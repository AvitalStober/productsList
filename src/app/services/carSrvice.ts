import axios from "axios";
import ICars from "../types/ICars";


export const getAllCars = async (): Promise<ICars[]> => {
    const res = axios
      .get("http://localhost:3000/api/cars/get")
      .then((response) => response.data)
      .catch((error) => console.error(error));
  
    return res;
  };

  
export const getCarById = async (): Promise<ICars> => {
  const res = axios
    .get("http://localhost:3000/api/cars/get/:carId")
    .then((response) => response.data)
    .catch((error) => console.error(error));

  return res;
};

  export const postCar = async () => {
    const res = axios
      .post("http://localhost:3000/api/cars/post")
      .then((response) => response.data)
      .catch((error) => console.error(error));
  
    return res;
  };

  export const putCar = async () => {
    const res = axios
      .put("http://localhost:3000/api/cars/put")
      .then((response) => response.data)
      .catch((error) => console.error(error));
  
    return res;
  };

  export const deleteCar = async (carId:string) => {
    const res = axios
      .delete(`http://localhost:3000/api/cars/delete/${carId}`)
      .then((response) => response.data)
      .catch((error) => console.error(error));
  
    return res;
  };
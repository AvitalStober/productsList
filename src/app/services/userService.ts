import axios from "axios";
import IUser from "../types/IUser";

// export const getAllUsers = async (): Promise<IUser[]> => {
//     const res = axios
//       .get("http://localhost:3000/api/Users/get")
//       .then((response) => response.data)
//       .catch((error) => console.error(error));

//     return res;
//   };

export const getUserById = async (): Promise<IUser> => {
  const res = await axios
    .get(`http://localhost:3000/api/users/get/`)
    .then((response) => response.data)
    .catch((error) => console.error(error));

  return res;
};

export const checkUser = async (myId: string, password: string) => {
  const res = await axios
    .get("http://localhost:3000/api/users/checkUser", {
      params: { myId, password },
    })
    .then((response) => {
      console.log("checking", response);
      return response.data;
    })
    .catch((error) => console.error(error));

  return res;
};

export const postUser = async (
  myId: string,
  userName: string,
  email: string,
  password: string
) => {
  const res = await axios
    .post("http://localhost:3000/api/users/registerUser", {
      myId,
      userName,
      email,
      password,
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));

  return res;
};

export const putUser = async () => {
  const res = await axios
    .put("http://localhost:3000/api/users/put")
    .then((response) => response.data)
    .catch((error) => console.error(error));

  return res;
};

export const deleteUser = async (userId: string) => {
  const res = await axios
    .delete(`http://localhost:3000/api/users/delete/${userId}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));

  return res;
};

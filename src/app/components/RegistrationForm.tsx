// import { useState } from 'react';
// import axios from 'axios';

// const RegistrationForm: React.FC = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.post('/api/registerUser', { name, email, password });
//       alert('User registered successfully');
//     } catch (error) {
//       console.error('Error registering user:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleRegister}>
//       <input
//         type="text"
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         required
//       />
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button type="submit">Register</button>
//     </form>
//   );
// };

// export default RegistrationForm;

"use client";

import { useState } from "react";
import axios from "axios";
import { postUser } from "../services/userService";

interface SignupFormProps {
  onSuccess: () => void;
}

const RegistrationForm: React.FC<SignupFormProps> = ({ onSuccess }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      //   const response = await axios.post('/api/users/registerUser', { id, password, name, email });
      //   if (response.status === 201) {
      //     onSuccess(); // Call onSuccess to redirect
      //   }
    //   console.log("add user");
      
      const res = await postUser(id, name, email, password);
      console.log("res: " , res.status);

      if (res.status === 201) {
        onSuccess(); // Call onSuccess to redirect
      } else if (res.status === 200) {
        setError("User already exist. Please log in.");
      }
    } catch (error: any) {
      setError(
        "Error registering user: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg max-w-md w-full mx-auto"
    >
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
        className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="w-full py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
      >
        Sign Up
      </button>
      {error && (
        <p className="mt-2 text-red-500 text-sm text-center">{error}</p>
      )}
    </form>
  );
};

export default RegistrationForm;

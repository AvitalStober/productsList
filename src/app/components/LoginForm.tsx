// import { useState } from 'react';

// interface LoginFormProps {
//   onUserCheck: (id: string, password: string) => Promise<void>;
// }

// const LoginForm: React.FC<LoginFormProps> = ({ onUserCheck }) => {
//   const [id, setId] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await onUserCheck(id, password);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="ID"
//         value={id}
//         onChange={(e) => setId(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginForm;
"use client";
import { useState } from "react";
import { checkUser } from "../services/userService";

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await checkUser(id, password);
      console.log("res: " + res);

      if (res.exists) {
        console.log("succes");
        onSuccess(); // Call onSuccess to redirect
      } else {
        console.log("not succes");
        setError("User not found. Please sign up.");
      }
    } catch (error: any) {
      setError(
        "Error logging in: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <form
      onSubmit={handleLogin}
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
      <button
        type="submit"
        className="w-full py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
      >
        Login
      </button>
      {error && (
        <p className="mt-2 text-red-500 text-sm text-center">{error}</p>
      )}
    </form>
  );
};

export default LoginForm;

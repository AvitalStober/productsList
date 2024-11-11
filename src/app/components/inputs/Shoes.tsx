"use client";
import { postShoes, putShoes } from "@/app/services/shoesService";
import { IShoes, NewShoe } from "@/app/types/IShoes";
import React, { useState } from "react";

interface ShoesProps {
  setData: React.Dispatch<React.SetStateAction<IShoes[]>>;
  setEditing: (id: boolean) => void;
  setAdding: (id: boolean) => void;
  id: string;
  adding: boolean;
}

const Shoes: React.FC<ShoesProps> = ({
  setData,
  setAdding,
  setEditing,
  id,
  adding,
}) => {
  const [type, setType] = useState("");
  const [size, setSize] = useState(0);
  const [color, setColor] = useState("");
  const [error, setError] = useState("");

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      console.log(type, size, color);

      if (type && size && color) {
        const newItem: NewShoe = { type, size, color };

        const addedShoe: IShoes = await postShoes(newItem);

        console.log("added", addedShoe);

        setData((prevData) => [...prevData, addedShoe.Shoes]);

        setAdding(false);
        setType("");
        setSize(0);
        setColor("");
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
      if (type && size && color) {
        const newItem: NewShoe = { type, size, color };

        const myId = id;
        const addedShoe: IShoes = await putShoes(newItem, myId);
        console.log("addedShoe", addedShoe);

        setData((prevData) =>
          prevData.map((shoe) =>
            shoe._id === addedShoe._id ? addedShoe : shoe
          )
        );

        setAdding(false);
        setType("");
        setSize(0);
        setColor("");
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
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <input
          type="number"
          placeholder="Size"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          required
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
        >
          {adding ? "Add" : "Edit"} Shoe
        </button>
        {error && (
          <p className="mt-2 text-red-500 text-sm text-center">{error}</p>
        )}
      </form>
    </div>
  );
};

export default Shoes;

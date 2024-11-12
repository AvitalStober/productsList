"use client";
import { postCar, putCar } from "@/app/services/carSrvice";
import { ICars, NewCar } from "@/app/types/ICars";
import React, { useState } from "react";

interface CarsProps {
  setData: React.Dispatch<React.SetStateAction<ICars[]>>;
  setEditing: (id: boolean) => void;
  setAdding: (id: boolean) => void;
  id: string;
  adding: boolean;
}

const Car: React.FC<CarsProps> = ({
  setData,
  setAdding,
  setEditing,
  id,
  adding,
}) => {
  const [year, setYear] = useState(1977);
  const [carModel, setCarModel] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState("");

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      console.log(year, carModel, color);

      if (year && carModel && color) {
        const newItem: NewCar = { year, carModel, color };

        const addedCar: ICars = await postCar(newItem);

        console.log(addedCar);

        setData((prevData) => [...prevData, addedCar.Car]);

        setAdding(false);
        setYear(1977);
        setCarModel("");
        setColor("");
      } else {
        setError("Please fill in all fields.");
      }
    } catch (error: any) {
      setError(
        "Error adding car: " + (error.response?.data?.message || error.message)
      );
    }
  };

  const handleEditItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEditing(false);
    try {
      if (year && carModel && color) {
        const newItem: NewCar = { year, carModel, color };

        const myId = id;
        const addedCar: ICars = await putCar(newItem, myId);
        console.log("addedCar", addedCar);

        setData((prevData) =>
            prevData.map((car) =>
                car._id === addedCar._id ? addedCar : car
            )
          );

        setAdding(false);
        setYear(1977);
        setCarModel("");
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
          placeholder="year"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          required
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="model"
          value={carModel}
          onChange={(e) => setCarModel(e.target.value)}
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
          {adding ? "Add" : "Edit"} Car
        </button>
        {error && (
          <p className="mt-2 text-red-500 text-sm text-center">{error}</p>
        )}
      </form>
    </div>
  );
};

export default Car;

"use client";
import Card from "@/app/components/Card";
import { deleteCar, getAllCars, postCar } from "@/app/services/carSrvice";
import { ICars, NewCar } from "@/app/types/ICars";
import React, { useEffect, useState } from "react";

const page: React.FC = () => {
  const [data, setData] = useState<ICars[]>([]);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(false);

  const [id, setId] = useState("");
  const [year, setYear] = useState(1977);
  const [carModel, setCarModel] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const dataCars: ICars[] = await getAllCars();
        setData(dataCars);
        console.log("cars ", dataCars);
      } catch (error) {
        console.error("Error fetching shoes:", error);
        setError("Error fetching shoes.");
      }
    };
    getData();
  }, []);

  const handleDelete = async (idToDel: string) => {
    console.log(idToDel);
    await deleteCar(idToDel);
    setData(data.filter((car) => car._id !== idToDel));
    setId("");
  };

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
            Add Car
          </button>
          {error && (
            <p className="mt-2 text-red-500 text-sm text-center">{error}</p>
          )}
        </form>
      )}

      {data.map((car) => (
        <Card
          info={car}
          type={"cars"}
          key={car._id}
          setEditing={setEditing}
          setId={setId}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default page;

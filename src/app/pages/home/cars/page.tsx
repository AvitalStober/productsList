"use client";
import Card from "@/app/components/Card";
import Car from "@/app/components/inputs/Car";
import { deleteCar, getAllCars, postCar } from "@/app/services/carSrvice";
import { ICars, NewCar } from "@/app/types/ICars";
import React, { useEffect, useState } from "react";

const page: React.FC = () => {
  const [data, setData] = useState<ICars[]>([]);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(false);

  const [id, setId] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const dataCars: ICars[] = await getAllCars();
        setData(dataCars);
        console.log("cars ", dataCars);
      } catch (error) {
        console.error("Error fetching shoes:", error);
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

  return (
    <div className="flex flex-wrap">
      <button
        onClick={() => setAdding(true)}
        className="w-[90%] align-center bg-pink-300 hover:bg-pink-400 m-1 text-white font-bold py-2 px-4 rounded-full"
      >
        +
      </button>

      {adding && (
        <Car
          setData={setData}
          setAdding={setAdding}
          adding={true}
          setEditing={setEditing}
          id={id}
        />
      )}

      {data.map((car) =>
        editing && car._id === id ? (
          <Car
            setData={setData}
            setAdding={setAdding}
            adding={false}
            setEditing={setEditing}
            id={id}
          />
        ) : (
          <Card
            info={car}
            type={"cars"}
            key={car._id}
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

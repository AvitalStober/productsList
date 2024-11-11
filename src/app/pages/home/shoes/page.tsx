"use client";
import Card from "@/app/components/Card";
import Shoes from "@/app/components/inputs/Shoes";
import {
  deleteShoes,
  getAllShoes,
} from "@/app/services/shoesService";
import { IShoes, NewShoe } from "@/app/types/IShoes";
import React, { useEffect, useState } from "react";

const ShoesList: React.FC = () => {
  const [data, setData] = useState<IShoes[]>([]);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(false);

  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState(0);
  const [color, setColor] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const dataShoes: IShoes[] = await getAllShoes();
        setData(dataShoes);
      } catch (error) {
        console.error("Error fetching shoes:", error);
        setError("Error fetching shoes.");
      }
    };
    getData();
  }, []);

  const handleDelete = async (idToDel: string) => {
    console.log(idToDel);
    await deleteShoes(idToDel);
    setData(data.filter((shoe) => shoe._id !== idToDel));
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
        <Shoes
          setData={setData}
          setAdding={setAdding}
          adding={true}
          setEditing={setEditing}
          id={id}
        />
      )}

      {data.map((shoe) =>
        editing && shoe._id === id ? (
          <Shoes
            setData={setData}
            setAdding={setAdding}
            adding={false}
            setEditing={setEditing}
            id={id}
          />
        ) : (
          <Card
            info={shoe}
            type={"shoes"}
            key={shoe._id}
            setId={setId}
            handleDelete={handleDelete}
            setEditing={setEditing}
          />
        )
      )}
    </div>
  );
};

export default ShoesList;

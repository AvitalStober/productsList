// "use client";
// import React from "react";
// import { IShoes, NewShoe } from "@/app/types/IShoes";
// import IBook from "@/app/types/IBooks";
// import ICars from "@/app/types/ICars";
// import Image from "next/image";
// import Link from "next/link";
// import { useParams } from "next/navigation";

// const Card: React.FC<any> = ({
//   info,
//   type,
//   handleDelete,
//   setId,
//   setEditing,
// }) => {
//   const { infoId } = useParams();

//   return (
//     <div className="w-[40%] m-5 border border-solid border-blue-800 border-3">
//       {type === "shoes" && (
//         <div className="shoes">
//           <h1 className="font-bold text-2xl my-4 text-center">
//             {info.type} shoes
//           </h1>
//           <div className="text-2xl my-4 text-center">size: {info.size}</div>
//         </div>
//       )}

//       {type === "cars" && (
//         <div className="cars">
//           <h1 className="font-bold text-2xl my-4 text-center">
//             {info.carModel}
//           </h1>
//           <div className="text-2xl my-4 text-center">year: {info.year}</div>
//         </div>
//       )}

//       {(type === "shoes" || type === "cars") && (
//         <div
//           className={`flex justify-self-center text-2xl text-pink-200text-center`}
//         >
//           color
//           <div
//             className="w-10 h-5 m-2 border border-solid border-black border-3"
//             style={{ backgroundColor: info.color }}
//           ></div>
//         </div>
//       )}

//       {type === "books" && (
//         <div className="cars">
//           <h1 className="font-bold text-2xl my-4 text-center">{info.title}</h1>
//           <div className="text-2xl my-4 text-center">by: {info.author}</div>
//         </div>
//       )}

//       <button
//         onClick={() => {
//           console.log("in card", info._id);
//           setId(info._id);
//           handleDelete(info._id);
//         }}
//         className="bg-pink-300 hover:bg-pink-400 m-1 text-white font-bold py-2 px-4 rounded-full"
//       >
//         delete
//       </button>
//       <button
//         onClick={() => setEditing(true)}
//         className="bg-pink-300 hover:bg-pink-400 m-1 text-white font-bold py-2 px-4 rounded-full"
//       >
//         update
//       </button>
//     </div>
//   );
// };

// export default Card;

"use client";
import React from "react";
import { useParams } from "next/navigation";

interface CardProps {
  info: any;
  type: string;
  handleDelete: (id: string) => void;
  setId: (id: string) => void;
  setEditing: (isEditing: boolean) => void;
}

const Card: React.FC<CardProps> = ({
  info,
  type,
  handleDelete,
  setId,
  setEditing,
}) => {
  const { infoId } = useParams();

  return (
    <div className="w-[40%] m-5 border border-solid border-blue-800 border-3">
      <h1 className="font-bold text-2xl my-4 text-center">
        {info.name || info.title || info.type} {type}
      </h1>

      {info.size && (
        <div className="text-2xl my-4 text-center">Size: {info.size}</div>
      )}
      {info.carModel && (
        <div className="text-2xl my-4 text-center">{info.carModel}</div>
      )}
      {info.year && (
        <div className="text-2xl my-4 text-center">Year: {info.year}</div>
      )}
      {info.author && (
        <div className="text-xl my-4 text-center">By: {info.author}</div>
      )}

      {info.color && (
        <div className="flex justify-self-center text-2xl text-center">
          Color:
          <div
            className="w-10 h-5 m-2 border border-solid border-black border-3"
            style={{ backgroundColor: info.color }}
          ></div>
        </div>
      )}

      <button
        onClick={() => {
          setId(info._id);
          handleDelete(info._id);
        }}
        className="bg-pink-300 hover:bg-pink-400 m-1 text-white font-bold py-2 px-4 rounded-full"
      >
        Delete
      </button>

      <button
        onClick={() => {
          setId(info._id);
          setEditing(true);
        }}
        className="bg-pink-300 hover:bg-pink-400 m-1 text-white font-bold py-2 px-4 rounded-full"
      >
        Update
      </button>
    </div>
  );
};

export default Card;

import React from "react";
import Links from "./Links";

function NavBar() {
  interface Links {
    text: string;
    href: string;
  }
  const arr: Array<Links> = [
    { text: "Books", href: "/pages/home/books" },
    { text: "Shoes", href: "/pages/home/shoes" },
    { text: "Cars", href: "/pages/home/cars" },
    { text: "Login", href: "/pages/login" },
  ];
  return (
    <div className="flex h-16 justify-around">
      <div className="flex justify-evenly w-[50%]">
        {arr.map((indx) => {
          return <Links key={indx.text} text={indx.text} href={indx.href} />;
        })}
      </div>
    </div>
  );
}

export default NavBar;

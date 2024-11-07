import React from "react";
import Link from "next/link";

interface Links {
  text: string;
  href: string;
}

const Links: React.FC<Links> = ({ text, href }) => {
  return (
    <div className="self-center items-center text-center h-[80%] w-[100%] m-2 text-18 hover:bg-blue-500">
      <Link href={href} key={text}>
        {text}
      </Link>
    </div>
  );
};

export default Links;

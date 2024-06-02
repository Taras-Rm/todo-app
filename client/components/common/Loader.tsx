import React from "react";
import spinner from "../../public/spinner.gif";
import Image from "next/image";

type Size = "sm" | "md" | "lg";

const getLoaderSize = (size?: Size) => {
  const sizes = {
    sm: 50,
    md: 100,
    lg: 150,
  };

  if (!size) {
    return sizes.sm;
  }

  return sizes[size];
};

interface LoaderProps {
  size?: Size;
}

function Loader({ size }: LoaderProps) {
  const loaderSize = getLoaderSize(size);

  return (
    <Image
      src={spinner}
      alt="loader"
      width={loaderSize}
      height={loaderSize}
      className="mx-auto"
      priority={false}
    />
  );
}

export default Loader;

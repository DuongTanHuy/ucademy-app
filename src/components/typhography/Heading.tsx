import React from "react";

const Heading = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="text-2xl font-bold dark:text-gray-300">{children}</h1>;
};

export default Heading;

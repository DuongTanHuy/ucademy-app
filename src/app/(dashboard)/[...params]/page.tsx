import React from "react";

const page = ({ params }: { params: { params: string } }) => {
  return <div className="h-[200vh]">Dashboard {params.params}</div>;
};

export default page;

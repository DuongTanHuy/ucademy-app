import React from "react";

export default function page({
  params,
  searchParams,
}: {
  params: { segment: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log(searchParams);
  return <div>Dynamic {params.segment}</div>;
}

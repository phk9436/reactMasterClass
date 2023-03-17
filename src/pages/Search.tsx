import React from "react";
import { useSearchParams } from "react-router-dom";

function Search() {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("keyword"));
  return <div>Search</div>;
}

export default Search;

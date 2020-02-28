import React from "react";

const SearchResults = props => {


  return (
    <>
      <p>Search results for: {props.search}</p>
      <h1>Matching Employees</h1>
      <h1>Matching Animals</h1>
      <h1>Matching Owners</h1>
      <h1>Matching Locations</h1>
    </>
  )
}

export default SearchResults;

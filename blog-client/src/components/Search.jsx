import React from "react";

export const Search = ({ search, setSearch }) => {
  return (
    <div className="search">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          id="search"
          type="text"
          role="search"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </div>
  );
};

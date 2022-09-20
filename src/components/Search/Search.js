import React, { useState } from "react";
import "./Search.css";
import { FaSearch } from "react-icons/fa";

const Search = ({ setSearchQuery, setUseSearchParam, useSearchParam }) => {
  const [searchText, setSearchText] = useState(useSearchParam.get("q") || "");
  function URLify(string) {
    return string.trim().replace(/\s/g, "%20");
  }
  const handleChange = (event) => {
    setSearchText(event.target.value);
    setUseSearchParam({ q: URLify(event.target.value) });
  };

  return (
    <div id="searchcontainer">
      <div id="searchbar">
        <input
          type="text"
          id="searcharticle"
          value={searchText || useSearchParam.get("q") || ""}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setSearchQuery(searchText);
              setSearchText(searchText);
              setUseSearchParam({ q: URLify(searchText.trim()) });
            }
          }}
          onChange={handleChange}
          placeholder=" Search Articles..."
          name="search"
        />
      </div>
      <div id="searchbutton">
        <button
          id="searchbtn"
          onClick={() => {
            setSearchQuery(searchText);
            setSearchText(searchText);
            setUseSearchParam({ q: URLify(searchText.trim()) });
          }}
        >
          <FaSearch className="searchIcon" color="#FFFFFF" size={18} />
        </button>
      </div>
    </div>
  );
};

export default Search;

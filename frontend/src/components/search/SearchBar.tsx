import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { useDispatch } from "react-redux";
import {
  getAllProducts,
  searchByName,
} from "../../redux/features/products/productSlice";
import "./searchBar.css";

function SearchBar() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event: { target: { value: string } }) => {
    setSearchValue(event.target.value);
    dispatch(searchByName(event.target.value.toLowerCase()));
    if (event.target.value === "") {
      dispatch(getAllProducts());
    }
  };

  const closeSearchQuery = () => {
    setSearchValue("");
  };

  return (
    <div className="search-bar">
      <FaSearch />
      <input
        type="text"
        placeholder="Search for products"
        value={searchValue}
        onChange={handleSearch}
      />
      <FiDelete onClick={closeSearchQuery} id="delete-icon" />
    </div>
  );
}

export default SearchBar;

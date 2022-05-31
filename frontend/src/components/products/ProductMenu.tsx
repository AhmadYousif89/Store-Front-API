import {
  getAllProducts,
  searchByName,
} from "../../redux/features/products/productSlice";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import "./styles/productMenu.css";

function ProductMenu() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  const { products } = useSelector((state: RootStateOrAny) => state.products);

  const handleProductFilter = (e: { target: { value: string } }) => {
    setSearchValue(e.target.value);
    dispatch(searchByName(e.target.value.toLowerCase()));
    if (e.target.value === "") {
      dispatch(getAllProducts());
    }
  };

  return (
    <div className="menu">
      <AiOutlineSearch />
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search For Product"
        value={searchValue}
        onChange={handleProductFilter}
      />
    </div>
  );
}

export default ProductMenu;

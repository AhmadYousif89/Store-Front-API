import { useState } from "react";
import { AiOutlineBgColors } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../redux/features/products/productSlice";
import { Products } from "../../../types/types";
import "./styles/createProduct.css";

const initialValues: Products = {
  category: "",
  brand: "",
  name: "",
  price: 0,
  color: "",
  description: "",
};
function CreateProduct() {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [formInputs, setFormInputs] = useState(initialValues);
  const { category, brand, name, price, color, description } = formInputs;

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setFormInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUploadImage = (e: { target: { files: FileList | null } }) => {
    const imgFile = (e.target.files as FileList)[0];
    imageToBase64(imgFile);
  };

  const imageToBase64 = (imgFile: Blob) => {
    const reader = new FileReader();
    if (imgFile) {
      reader.readAsDataURL(imgFile);
      reader.onloadend = () => setImage(reader.result as string);
    } else {
      setImage("");
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const productInfo = { ...formInputs, image };
    dispatch(createProduct(productInfo));
  };

  return (
    <section className="create-product-container">
      <h1 className="title">Create Product</h1>
      <form className="create-product-form" onSubmit={handleSubmit}>
        <div className="form-wrapper">
          <div className="product-form-input">
            <select
              name="category"
              className="select-options"
              value={category}
              onChange={handleInputChange}
              required>
              <option value="" disabled>
                Choose Category
              </option>
              <option value="electronics">Electronics</option>
              <option value="mobiles">Mobiles</option>
            </select>
          </div>
          <div className="product-form-input">
            <select
              name="brand"
              className="select-options"
              value={brand}
              onChange={handleInputChange}
              required>
              <option value="" disabled>
                Select Brand
              </option>
              <option value="samsung">Samsung</option>
              <option value="apple">Apple</option>
              <option value="xiaomi">Xiaomi</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="product-form-input">
            <input
              type="file"
              accept="image/"
              id="upload-image"
              onChange={handleUploadImage}
              multiple={false}
              required
            />
          </div>
          <div className="form-input color">
            <input
              type="color"
              name="color"
              value={color}
              placeholder="Enter product color"
              onChange={handleInputChange}
              required
            />
            <AiOutlineBgColors />
          </div>
          <div className="form-input">
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter product name"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-input">
            <input
              type="number"
              name="price"
              value={price}
              placeholder="Enter product price"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-input">
            <input
              type="text"
              name="description"
              value={description}
              placeholder="Short Description"
              onChange={handleInputChange}
            />
          </div>
          <button className="form-btn">SUBMIT</button>
        </div>
        <div className="image-preview">
          <p>Image Preview</p>
          {image ? <img src={image} alt="product-images" /> : ""}
        </div>
      </form>
    </section>
  );
}

export default CreateProduct;

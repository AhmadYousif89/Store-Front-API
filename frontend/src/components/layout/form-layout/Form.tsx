import InputFields from "./InputFields";
import "./styles/form.css";

function Form() {
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const previewImage = () => {};

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-content">
        <div className="form-group">
          <div className="product-form">
            <InputFields type="file" accept="image" onChange={previewImage} />
            <InputFields
              type="text"
              name="brand"
              value={""}
              onChange={() => {}}
            />
            <InputFields
              type="text"
              name="name"
              value={""}
              onChange={() => {}}
            />
            <InputFields
              type="text"
              name="color"
              value={""}
              onChange={() => {}}
            />
            <InputFields
              type="text"
              name="desc"
              value={""}
              onChange={() => {}}
            />
          </div>
          <button className="">submit</button>
          <div className="preview-image"></div>
        </div>
      </div>
    </form>
  );
}

export default Form;

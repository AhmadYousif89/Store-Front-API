import "./styles/inputFields.css";

type Props = {
  type?: string;
  name?: string;
  value?: string;
  accept?: string;
  placeholder?: string;
  onChange?: () => void;
};
function InputFields(props: Props) {
  return (
    <div className="inputs-container">
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        accept={props.accept}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  );
}

export default InputFields;

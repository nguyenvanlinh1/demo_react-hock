import { TextField } from "@mui/material";

export enum TextFieldVariant {
    OUTLINED = "outlined",
    FILLED = "filled",
    STANDARD = "standard",
  }


interface IInput {
    name: string;
    variantInput: TextFieldVariant;
    label: React.ReactNode;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
}

const CustomInput = ({name, variantInput, label, onChange} : IInput) => {
  return (
    <div>
      <TextField id="" name={name} label={label} variant={variantInput} onChange={onChange}/>
    </div>
  );
};

export default CustomInput;

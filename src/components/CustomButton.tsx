import { Button } from "@mui/material";

export enum ButtonVariant {
  CONTAINED = "contained",
  OUTLINED = "outlined",
  TEXT = "text",
}

interface IButton {
  typeButton: ButtonVariant;
  name: string | JSX.Element;
  isFullWidth?: boolean;
  style?: React.CSSProperties;
  opacity?: string;
  onClick?: () => void;
}

const CustomButton = ({
  typeButton,
  name,
  isFullWidth = true,
  style,
  opacity,
  onClick,
}: IButton) => {
  return (
    <div>
      <Button
        variant={typeButton}
        sx={{
          color: "#121110",
          fontWeight: 600,
          bgcolor: "#FFA21A",
          borderRadius: "10px",
          textTransform: "capitalize",
          "&:hover": {
            opacity: opacity,
          },
          "&.Mui-disabled": {
            bgcolor: "#FFA21A",
            opacity: 0.6,
          },
        }}
        fullWidth={isFullWidth}
        style={style}
        onClick={onClick}
      >
        {name}
      </Button>
    </div>
  );
};

export default CustomButton;

import { ReactElement } from "react";

interface ButtonType {
  children: ReactElement;
  clickHandler: () => void;
  isSubmit: boolean;
}
interface ButtonProps {
  isSubmit: boolean;
}

export type { ButtonType, ButtonProps };

import { ReactElement } from "react";

interface ButtonType {
  children: string;
  clickHandler: () => void;
  isSubmit: boolean;
}
interface ButtonProps {
  isSubmit: boolean;
}

export type { ButtonType, ButtonProps };

import { ButtonType, ButtonProps } from "../types";
import styled from "@emotion/styled";

const Button = styled.button<ButtonProps>`
  padding: ${(props) => (props.isSubmit ? "5px" : "5px 10px")};
`;

export default function ButtonComponent({
  isSubmit,
  clickHandler,
  children,
}: ButtonType) {
  return (
    <Button isSubmit={isSubmit} onClick={clickHandler}>
      {children}
    </Button>
  );
}

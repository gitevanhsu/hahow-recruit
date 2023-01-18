import { ButtonType, ButtonProps } from "../types";
import styled from "@emotion/styled";

const Button = styled.button<ButtonProps>`
  min-width: 30px;
  min-height: 30px;
  padding: ${(props) => (props.isSubmit ? "5px 35px" : "5px")};
  font-size: 14px;
  font-weight: bold;
  background-color: #e6e6e6;
  border: 2px solid #000;
  border-radius: 5px;
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

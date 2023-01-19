import styled from "@emotion/styled";
import ButtonComponent from "./Button";
import { LeftPointAreaProps } from "../types";

const LeftPointWrap = styled.div`
  width: 50%;
  min-width: 210px;
  padding: 10px;
  margin-top: auto;
  margin-right: auto;
  text-align: right;
  @media screen and (max-width: 507px) {
    margin-top: 20px;
    text-align: left;
  }
`;

const LeftPoint = styled.p`
  margin-bottom: 20px;
`;
export default function LeftPointArea({
  submitFunction,
  point,
}: LeftPointAreaProps) {
  return (
    <LeftPointWrap>
      <LeftPoint>
        剩餘點數：
        {point}
      </LeftPoint>
      <ButtonComponent isSubmit clickHandler={submitFunction}>
        儲存
      </ButtonComponent>
    </LeftPointWrap>
  );
}

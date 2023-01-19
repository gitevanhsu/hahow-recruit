import styled from "@emotion/styled";

import ButtonComponent from "./Button";
import { AttributeItemProps } from "../types";

const Attribute = styled.div`
  padding: 20px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AttributeName = styled.div`
  width: 100px;
`;
const AttributeCount = styled.div`
  width: 50px;
  text-align: center;
`;

export default function AttributeItem({
  attributePoint,
  attributeName,
  increaseHandler,
  decreaseHandler,
}: AttributeItemProps) {
  return (
    <Attribute>
      <AttributeName>{attributeName}</AttributeName>
      <ButtonComponent
        isSubmit={false}
        clickHandler={() => increaseHandler(attributeName.toLowerCase())}
      >
        +
      </ButtonComponent>
      <AttributeCount>
        {attributePoint && attributePoint[attributeName.toLowerCase()]}
      </AttributeCount>
      <ButtonComponent
        isSubmit={false}
        clickHandler={() => decreaseHandler(attributeName.toLowerCase())}
      >
        -
      </ButtonComponent>
    </Attribute>
  );
}

import { useParams } from "react-router-dom";
import styled from "@emotion/styled";

import ButtonComponent from "../components/Button";

const ProfileWrap = styled.div`
  width: 95%;
  max-width: 980px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 30px;
  border: 1px solid #000;
  margin-top: 20px;
  font-size: 24px;
  font-weight: 500;
`;
const AttributeWrap = styled.div`
  width: 50%;
  min-width: 210px;
`;
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

const LeftPointWrap = styled(AttributeWrap)`
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

const attributeList = ["STR", "INT", "AGI", "LUK"];

export default function HeroProfile() {
  let { heroId } = useParams();

  return (
    <ProfileWrap>
      <AttributeWrap>
        {attributeList.map((item) => (
          <Attribute key={item}>
            <AttributeName>{item}</AttributeName>
            <ButtonComponent isSubmit={false} clickHandler={() => {}}>
              +
            </ButtonComponent>
            <AttributeCount>0</AttributeCount>
            <ButtonComponent isSubmit={false} clickHandler={() => {}}>
              -
            </ButtonComponent>
          </Attribute>
        ))}
      </AttributeWrap>
      <LeftPointWrap>
        <LeftPoint>剩餘點數：0</LeftPoint>
        <ButtonComponent isSubmit clickHandler={() => {}}>
          儲存
        </ButtonComponent>
      </LeftPointWrap>
    </ProfileWrap>
  );
}

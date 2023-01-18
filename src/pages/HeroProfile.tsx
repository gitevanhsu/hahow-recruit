import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";

import ButtonComponent from "../components/Button";
import { HeroProfileType } from "../types";

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
const attributeInit = {
  agi: 0,
  int: 0,
  luk: 0,
  str: 0,
};

export default function HeroProfile() {
  const [attributePoint, setAttributePoint] =
    useState<HeroProfileType>(attributeInit);
  const [leftPoint, setLeftPoint] = useState(0);
  const { heroId } = useParams();
  useEffect(() => {
    fetch(`https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`)
      .then((res) => res.json())
      .then((data) => {
        setAttributePoint(data);
        setLeftPoint(0);
      });
  }, [heroId]);

  return (
    <ProfileWrap>
      <AttributeWrap>
        {attributeList.map((item) => (
          <Attribute key={item}>
            <AttributeName>{item}</AttributeName>
            <ButtonComponent isSubmit={false} clickHandler={() => {}}>
              +
            </ButtonComponent>
            <AttributeCount>
              {attributePoint && attributePoint[item.toLowerCase()]}
            </AttributeCount>
            <ButtonComponent isSubmit={false} clickHandler={() => {}}>
              -
            </ButtonComponent>
          </Attribute>
        ))}
      </AttributeWrap>
      <LeftPointWrap>
        <LeftPoint>剩餘點數：{leftPoint}</LeftPoint>
        <ButtonComponent isSubmit clickHandler={() => {}}>
          儲存
        </ButtonComponent>
      </LeftPointWrap>
    </ProfileWrap>
  );
}

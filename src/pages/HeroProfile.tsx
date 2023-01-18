import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error("nodata");
      })
      .then((data) => {
        setAttributePoint(data);
        setLeftPoint(0);
      })
      .catch(() => navigate("/heroes/1"));
  }, [heroId, navigate]);

  const increasePoint = (attr: string) => {
    if (!leftPoint) return;
    setAttributePoint((a) => ({ ...a, attr: (attributePoint[attr] += 1) }));
    setLeftPoint((l) => l - 1);
  };

  const decreasePoint = (attr: string) => {
    if (attributePoint[attr] <= 0) return;
    setAttributePoint((a) => ({ ...a, attr: (attributePoint[attr] -= 1) }));
    setLeftPoint((l) => l + 1);
  };

  const submitProfile = () => {
    if (leftPoint) return;
    fetch(`https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`, {
      method: "PATCH",
      headers: { "Content-Type": " application/json" },
      body: JSON.stringify(attributePoint),
    });
  };

  return (
    <ProfileWrap>
      <AttributeWrap>
        {attributeList.map((item) => (
          <Attribute key={item}>
            <AttributeName>{item}</AttributeName>
            <ButtonComponent
              isSubmit={false}
              clickHandler={() => {
                increasePoint(item.toLowerCase());
              }}
            >
              +
            </ButtonComponent>
            <AttributeCount>
              {attributePoint && attributePoint[item.toLowerCase()]}
            </AttributeCount>
            <ButtonComponent
              isSubmit={false}
              clickHandler={() => {
                decreasePoint(item.toLowerCase());
              }}
            >
              -
            </ButtonComponent>
          </Attribute>
        ))}
      </AttributeWrap>
      <LeftPointWrap>
        <LeftPoint>
          剩餘點數：
          {leftPoint}
        </LeftPoint>
        <ButtonComponent isSubmit clickHandler={submitProfile}>
          儲存
        </ButtonComponent>
      </LeftPointWrap>
    </ProfileWrap>
  );
}

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";

import { HeroProfileType } from "../types";
import NoticeModal from "../components/NoticeModal";
import LeftPointArea from "../components/LeftPointArea";
import AttributeItem from "../components/Attribute";

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

  const [showSaveNotice, setShowSaveNotice] = useState(false);
  const [showSaveFailNotice, setShowSaveFailNotice] = useState(false);
  const [showTooLowNotice, setShowTooLowNotice] = useState(false);
  const [showNoPointNotice, setShowNoPointNotice] = useState(false);

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
    if (!leftPoint) {
      setShowNoPointNotice(true);
    } else {
      setAttributePoint({
        ...attributePoint,
        [attr]: (attributePoint[attr] += 1),
      });
      setLeftPoint(leftPoint - 1);
    }
  };

  const decreasePoint = (attr: string) => {
    if (attributePoint[attr] <= 0) {
      setShowTooLowNotice(true);
    } else {
      setAttributePoint({
        ...attributePoint,
        [attr]: (attributePoint[attr] -= 1),
      });
      setLeftPoint(leftPoint + 1);
    }
  };

  const submitProfile = () => {
    if (leftPoint) {
      setShowSaveFailNotice(true);
    } else {
      fetch(`https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`, {
        method: "PATCH",
        headers: { "Content-Type": " application/json" },
        body: JSON.stringify(attributePoint),
      });
      setShowSaveNotice(true);
    }
  };

  return (
    <ProfileWrap>
      <AttributeWrap>
        {attributeList.map((item) => (
          <AttributeItem
            key={item}
            attributePoint={attributePoint}
            attributeName={item}
            increaseHandler={increasePoint}
            decreaseHandler={decreasePoint}
          />
        ))}
      </AttributeWrap>
      <LeftPointArea submitFunction={submitProfile} point={leftPoint} />
      {showSaveFailNotice &&
        NoticeModal(setShowSaveFailNotice, "尚有點數未分配")}
      {showSaveNotice && NoticeModal(setShowSaveNotice, "已成功儲存資料")}
      {showTooLowNotice && NoticeModal(setShowTooLowNotice, "點數不能低於 0")}
      {showNoPointNotice && NoticeModal(setShowNoPointNotice, "無可分配點數")}
    </ProfileWrap>
  );
}

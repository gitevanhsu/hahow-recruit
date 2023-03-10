import { useContext, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "@emotion/styled";

import { HeroProfileType } from "../types";
import NoticeModal from "../components/NoticeModal";
import LeftPointArea from "../components/LeftPointArea";
import AttributeItem from "../components/Attribute";
import { HeroesProfileContext } from "../context/HeroesProfile";

const ProfileWrap = styled.div`
  width: 95%;
  max-width: 980px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 30px;
  border: 1px solid #000;
  background-color: #f5f5f5;
  margin-top: 20px;
  font-size: 24px;
  font-weight: 500;
  border-radius: 10px;
`;
const AttributeWrap = styled.div`
  width: 50%;
  min-width: 210px;
`;

const attributeList = ["STR", "INT", "AGI", "LUK"];
const attributeInit = { agi: 0, int: 0, luk: 0, str: 0 };

export default function HeroProfile() {
  const { heroesProfile, setHeroProfile } = useContext(HeroesProfileContext);
  const heroId = useOutletContext() as string;
  const navigate = useNavigate();

  const [attributePoint, setAttributePoint] = useState<HeroProfileType>(attributeInit);
  const [leftPoint, setLeftPoint] = useState(0);

  // popup modal state
  const [showSaveNotice, setShowSaveNotice] = useState(false);
  const [showSaveFailNotice, setShowSaveFailNotice] = useState(false);
  const [showTooLowNotice, setShowTooLowNotice] = useState(false);
  const [showNoPointNotice, setShowNoPointNotice] = useState(false);

  useEffect(() => {
    const heroData = heroesProfile?.find((hero) => hero.info.id === heroId);
    // if hero is not exist redirect to hero 1 page.
    if (!heroData) {
      navigate("/heroes/1");
    } else {
      setAttributePoint(heroData.data);
    }
  }, [heroId, heroesProfile, navigate]);

  const increasePoint = (attr: string) => {
    if (!leftPoint) {
      setShowNoPointNotice(true);
    } else {
      setAttributePoint({ ...attributePoint, [attr]: (attributePoint[attr] += 1) });
      setLeftPoint(leftPoint - 1);
    }
  };

  const decreasePoint = (attr: string) => {
    if (attributePoint[attr] <= 0) {
      setShowTooLowNotice(true);
    } else {
      setAttributePoint({ ...attributePoint, [attr]: (attributePoint[attr] -= 1) });
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
      setHeroProfile((s) => s.map((hero) => {
        if (hero.info.id === heroId) {
          return { ...hero, data: attributePoint };
        }
        return hero;
      }));
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
      {showSaveFailNotice && NoticeModal(setShowSaveFailNotice, "?????????????????????")}
      {showSaveNotice && NoticeModal(setShowSaveNotice, "?????????????????????")}
      {showTooLowNotice && NoticeModal(setShowTooLowNotice, "?????????????????? 0")}
      {showNoPointNotice && NoticeModal(setShowNoPointNotice, "??????????????????")}
    </ProfileWrap>
  );
}

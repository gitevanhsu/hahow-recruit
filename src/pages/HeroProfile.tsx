import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";

import ButtonComponent from "../components/Button";
import { HeroProfileType } from "../types";
import NoticeAlert from "../modal";

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

      {showSaveFailNotice &&
        createPortal(
          <NoticeAlert
            closeModal={() => {
              setShowSaveFailNotice(false);
            }}
          >
            尚有點數未分配
          </NoticeAlert>,
          document.querySelector("#modal-root") as HTMLElement
        )}
      {showSaveNotice &&
        createPortal(
          <NoticeAlert
            closeModal={() => {
              setShowSaveNotice(false);
            }}
          >
            已成功儲存資料
          </NoticeAlert>,
          document.querySelector("#modal-root") as HTMLElement
        )}
      {showTooLowNotice &&
        createPortal(
          <NoticeAlert
            closeModal={() => {
              setShowTooLowNotice(false);
            }}
          >
            點數不能低於 0
          </NoticeAlert>,
          document.querySelector("#modal-root") as HTMLElement
        )}
      {showNoPointNotice &&
        createPortal(
          <NoticeAlert
            closeModal={() => {
              setShowNoPointNotice(false);
            }}
          >
            無可分配點數
          </NoticeAlert>,
          document.querySelector("#modal-root") as HTMLElement
        )}
    </ProfileWrap>
  );
}

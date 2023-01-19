import { useContext } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { HeroCardProps, HeroInfoType } from "../types";

import { HeroesProfileContext } from "../context/HeroesProfile";

const HeroCard = styled(Link)<HeroCardProps>`
  display: block;
  width: 220px;
  margin: 10px 5px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  color: #000;
  border-radius: 5px;
  box-shadow: 5px 5px 5px #ccc;
  overflow: hidden;
  border: 1px solid #ccc;
  transform: ${(props) => (props.current === "true" ? "translateY(-10px)" : "translateY(0px)")};

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    width: 97%;
    height: 97%;
    background-color: #f3f3f3;
    left: 1.5%;
    top: 1.5%;
    border-radius: 2px;
  }
  &::after {
    ${(props) => (props.current === "true" ? "content:''" : null)};
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    animation: rotate 4s linear infinite;
    background-repeat: no-repeat;
    background-size: 50% 50%, 50% 50%;
    background-position: 0 0, 100% 0, 100% 100%, 0 100%;
    background-image: linear-gradient(#399953, #399953),
      linear-gradient(#fbb300, #fbb300), linear-gradient(#d53e33, #d53e33),
      linear-gradient(#377af5, #377af5);
  }
  @keyframes rotate {
    100% {
      transform: rotate(1turn);
    }
  }
`;

const PreviewCard = styled.div`
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px;
  border-radius: 5px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #ddd;
  transition: 0.3s;
  opacity: 0;
`;
const HeroCardWrap = styled.div`
  position: relative;
  &:hover ${PreviewCard} {
    bottom: -20px;
    transition: 0.3s;
    opacity: 1;
  }
  &: hover ${HeroCard} {
    transform: translateY(-10px);
    transition: 0.3s;
  } ;
`;

const HeroImage = styled.img``;
const HeroName = styled.h2`
  margin: 30px 0;
  font-size: 24px;
  font-weight: 500;
`;

const PreviewItemWrap = styled.div`
  width: 100px;
`;
const PreviewItem = styled.div`
  display: inline-block;
  min-width: 40px;
`;
const PreviewContent = styled.p`
  display: inline-block;
`;

function PreviewProfileComponent({ id }:{id:string}) {
  const { heroesProfile } = useContext(HeroesProfileContext);

  const heroProfile = heroesProfile?.filter((hero) => hero.info.id === id)[0];

  return (
    <PreviewCard>
      {heroProfile?.data && Object.keys(heroProfile.data).map((item) => (
        <PreviewItemWrap key={item}>
          <PreviewItem>{item.toUpperCase()}</PreviewItem>
          :
          <PreviewContent>{heroProfile.data[item]}</PreviewContent>
        </PreviewItemWrap>
      ))}
    </PreviewCard>
  );
}

export default function HeroCardComponent({
  heroId,
  id,
  image,
  name,
}: HeroInfoType) {
  return (
    <HeroCardWrap>
      <HeroCard current={`${heroId === id}`} to={`/heroes/${id}`} key={id}>
        <HeroImage src={image} />
        <HeroName>{name}</HeroName>
      </HeroCard>
      <PreviewProfileComponent id={id} />
    </HeroCardWrap>
  );
}

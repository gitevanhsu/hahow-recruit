import { useContext } from "react";
import styled from "@emotion/styled";

import { HeroesProfileContext } from "../context/HeroesProfile";

export const PreviewCard = styled.div`
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
const PreviewItemWrap = styled.div`
  width: 100px;
`;
const PreviewItem = styled.div`
  display: inline-block;
  min-width: 40px;
`;
const PreviewContent = styled.p`
  width: 25px;
  text-align: center;
  display: inline-block;
`;

export default function PreviewProfileComponent({ id }: { id: string }) {
  const { heroesProfile } = useContext(HeroesProfileContext);
  const heroProfile = heroesProfile && heroesProfile?.find((hero) => hero.info.id === id);
  return (
    <PreviewCard>
      {heroProfile?.data &&
        Object.keys(heroProfile.data).map((item) => (
          <PreviewItemWrap key={item}>
            <PreviewItem>{item.toUpperCase()}</PreviewItem>
            :
            <PreviewContent>{heroProfile.data[item]}</PreviewContent>
          </PreviewItemWrap>
        ))}
    </PreviewCard>
  );
}

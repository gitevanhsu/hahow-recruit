import { useEffect } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import styled from "@emotion/styled";

import useGetHeroList from "../hooks/useGetHeroList";
import { HeroInfoType } from "../types";
import HeroCardComponent from "../components/HeroCard";
import HeroesProfileProvider from "../context/HeroesProfile";

const PageWrap = styled.div`
  padding: 50px 0;
`;
const HeroListWrap = styled.div`
  width: 95%;
  max-width: 980px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid #000;
  border-radius: 10px;
  background-color: #f5f5f5;
`;

export default function Heroes() {
  const location = useLocation();
  const { heroId } = useParams();

  const heroList = useGetHeroList();

  // modify tab title when path change.
  useEffect(() => {
    if (location.pathname === "/heroes/" || location.pathname === "/heroes") {
      document.title = "Hero List Page";
    } else {
      document.title = "Hero Profile Page";
    }
  }, [location]);

  return (
    <PageWrap>
      <HeroesProfileProvider heroList={heroList}>
        <HeroListWrap>
          {heroList.map((hero: HeroInfoType) => {
            const { id, image, name } = hero;
            return (
              <HeroCardComponent
                key={id}
                heroId={heroId}
                id={id}
                image={image}
                name={name}
              />
            );
          })}
        </HeroListWrap>
      </HeroesProfileProvider>
      {heroId && <Outlet context={heroId} />}
    </PageWrap>
  );
}

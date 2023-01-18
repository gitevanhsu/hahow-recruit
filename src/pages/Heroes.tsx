import { useEffect } from "react";
import { Outlet, useLocation, Link, useParams } from "react-router-dom";
import styled from "@emotion/styled";

import useGetHeroList from "../hooks/useGetHeroList";
import { HeroCardProps, HeroInfoType } from "../types";

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
`;

const HeroCard = styled(Link)<HeroCardProps>`
  display: block;
  width: 220px;
  margin: 10px 5px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  color: #000;
  border: 2px solid ${(props) => (props.current === "true" ? "#f00" : "#000")};
`;
const HeroImage = styled.img``;
const HeroName = styled.h2`
  margin: 30px 0;
  font-size: 24px;
  font-weight: 500;
`;

export default function Heroes() {
  const location = useLocation();
  const { heroId } = useParams();

  // modify tab title when path change.
  useEffect(() => {
    if (location.pathname === "/heroes/" || location.pathname === "/heroes") {
      document.title = "Hero List Page";
    } else {
      document.title = "Hero Profile Page";
    }
  }, [location]);
  const heroList = useGetHeroList();

  return (
    <PageWrap>
      <HeroListWrap>
        {heroList.map((hero: HeroInfoType) => {
          const { id, image, name } = hero;
          return (
            <HeroCard
              current={`${heroId === id}`}
              to={`/heroes/${id}`}
              key={id}
            >
              <HeroImage src={image} />
              <HeroName>{name}</HeroName>
            </HeroCard>
          );
        })}
      </HeroListWrap>
      <Outlet />
    </PageWrap>
  );
}

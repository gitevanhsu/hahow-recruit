import { useEffect, useState } from "react";
import { HeroProfileType } from "../types";

const attributeInit = {
  agi: 0,
  int: 0,
  luk: 0,
  str: 0,
};

export default function useGetHeroProfile(heroId: string) {
  const [attributePoint, setAttributePoint] = useState<HeroProfileType | false>(
    attributeInit
  );

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
      })
      .catch(() => setAttributePoint(false));
  }, [heroId]);

  return attributePoint;
}

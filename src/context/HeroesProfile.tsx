import {
  createContext,
  ReactElement,
  useState,
  useEffect,
  useMemo,
} from "react";
import { FullHeroInfo, HeroContextType, HeroInfoType } from "../types";

const initHeroesData = {
  heroesProfile: [],
  setHeroProfile: () => [],
};

export const HeroesProfileContext = createContext<HeroContextType>(initHeroesData);

export default function HeroesProfileProvider({
  heroList,
  children,
}: {
  heroList: HeroInfoType[];
  children: ReactElement;
}) {
  const [heroesProfile, setHeroProfile] = useState<FullHeroInfo[]>([]);

  useEffect(() => {
    async function getHeroesProfile() {
      const heroesProfileData = await Promise.all(
        heroList.map((hero) => fetch(`https://hahow-recruit.herokuapp.com/heroes/${hero.id}/profile`).then((res) => res.json()).then((data) => ({ info: hero, data })))
      );
      return heroesProfileData as FullHeroInfo[];
    }
    getHeroesProfile().then((data) => setHeroProfile(data));
  }, [heroList]);

  const data = useMemo(
    () => ({ heroesProfile, setHeroProfile }),
    [heroesProfile]
  );

  return (
    <HeroesProfileContext.Provider value={data}>
      {children}
    </HeroesProfileContext.Provider>
  );
}

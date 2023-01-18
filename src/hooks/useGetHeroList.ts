import { useEffect, useState } from "react";

export default function useGetHeroList() {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    fetch("https://hahow-recruit.herokuapp.com/heroes")
      .then((res) => res.json())
      .then((data) => setHeroes(data));
  }, []);

  return heroes;
}

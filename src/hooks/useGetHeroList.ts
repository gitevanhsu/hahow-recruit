import { useEffect, useState } from "react";

export default function useGetHeroList() {
  const [heroList, setHeroList] = useState([]);

  useEffect(() => {
    fetch("https://hahow-recruit.herokuapp.com/heroes")
      .then((res) => res.json())
      .then((data) => setHeroList(data));
  }, []);

  return { heroList, setHeroList };
}

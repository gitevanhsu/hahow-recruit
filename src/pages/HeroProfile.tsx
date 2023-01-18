import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function HeroProfile() {
  let { heroId } = useParams();

  return (
    <>
      <h1>Hero Profile page</h1>
    </>
  );
}

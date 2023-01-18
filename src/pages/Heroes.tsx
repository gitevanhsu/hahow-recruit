import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function Heroes() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/heroes/" || location.pathname === "/heroes") {
      document.title = "Hero List Page";
    } else {
      document.title = "Hero Profile Page";
    }
  }, []);

  return (
    <>
      <h1>Heroes List page</h1>
      <Outlet />
    </>
  );
}

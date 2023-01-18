import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Heroes from "./pages/Heroes";
import HeroProfile from "./pages/HeroProfile";

const router = createBrowserRouter([
  {
    path: "heroes",
    element: <Heroes />,
    children: [
      {
        path: ":heroId",
        element: <HeroProfile />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="heroes" replace />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

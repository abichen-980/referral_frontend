import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout/RootLayout.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/", // Home route
        element: <HomePage />,
      },
    ],
  },
]);

export default routes;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import LoginPage from "./Login";
import RegisterPage from "./Register";
import RegisterVehiclePage from "./RegisterVehicle";
import DashboardPage from "./Dashboard";
import MorePicturesPage from "./MorePictures"

let pages = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/registervehicle",
    element: <RegisterVehiclePage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/morepictures",
    element: <MorePicturesPage />,
  },
];

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {pages.map((page, index) => {
          return <Route key={index} path={page.path} element={page.element} />;
        })}
      </Routes>
    </BrowserRouter>
  );
};
  
export default Router;
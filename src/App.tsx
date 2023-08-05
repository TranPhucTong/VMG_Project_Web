import React, { useState } from "react";
import "./App.css";
import { Helmet } from "react-helmet";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import mainRoutes, { adminRoutes } from "./routes/routes";
import LayoutHome from "./layout/layout-home/LayoutHome";
import logo from "./images/Logo.png";
import LayoutAdmin from "./layout/layout-admin/LayoutAdmin";
import { ToastContainer } from "react-toastify";
import configRoutes from "./config/configRouter";
import Login from "./pages/users/login/Login";


function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const appClass = isAdminRoute ? "AppAdmin" : "App";

   const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (username: string, password: string) => {
    if (username === "admin" && password === "vmgadmin") {
      setIsLoggedIn(true);
      setIsLoginError(false);
      navigate("/admin/home");
    } else {
      setIsLoggedIn(false);
      setIsLoginError(true);
    }
  };

  return (
    <div className={appClass}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>VMG Project</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content="Helmet application" />
      </Helmet>
      {isAdminRoute ? (
        <div>
          <Routes>
            {adminRoutes.map((route, index) => {
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <LayoutAdmin>
                      <Page />
                    </LayoutAdmin>
                  }
                ></Route>
              );
            })}
          </Routes>
          <ToastContainer />
        </div>
      ) : (
        <div className="w-full h-auto">
          <Routes>
            {mainRoutes.map((route, index) => {
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <LayoutHome>
                      <Page />
                    </LayoutHome>
                  }
                ></Route>
              );
            })}
          </Routes>
          <ToastContainer />
        </div>
      )}

      {!isLoggedIn && !isAdminRoute && (
        <div className="flex justify-center items-center">
          <Routes>
            <Route path={configRoutes.login} element={<Login onLogin={handleLogin} />} />
          </Routes>
        </div>
      )}

      {isLoginError && (
        <div className="text-red-500 mt-4">
          Sai tên đăng nhập hoặc mật khẩu, vui lòng thử lại.
        </div>
      )}

    </div>
  );
}

export default App;

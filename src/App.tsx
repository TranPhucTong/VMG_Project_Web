import React from "react";
import "./App.css";
import { Helmet } from "react-helmet";
import { Route, Routes, useLocation } from "react-router-dom";
import mainRoutes, { adminRoutes } from "./routes/routes";
import LayoutHome from "./layout/layout-home/LayoutHome";
import logo from "./images/Logo.png";
import LayoutAdmin from "./layout/layout-admin/LayoutAdmin";
import { ToastContainer } from "react-toastify";


function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const appClass = isAdminRoute ? "AppAdmin" : "App";
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

      {/* <div className="w-full px-24 mt-6 pb-24">
        <div className="bg-white w-full h-auto">
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
        </div>
      </div> */}

    </div>
  );
}

export default App;

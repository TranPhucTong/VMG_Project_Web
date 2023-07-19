import React from "react";
import "./App.css";
import { Helmet } from "react-helmet";
import { Route, Routes, useLocation } from "react-router-dom";
import mainRoutes, { adminRoutes } from "./routes/routes";
import LayoutHome from "./layout/layout-home/LayoutHome";
import logo from "./images/Logo.png";
import LayoutAdmin from "./layout/layout-admin/LayoutAdmin";

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
        </div>
      ) : (
        <div>
          <div className="flex justify-center items-center">
            <a
              href="https://www.facebook.com/vmg.corona"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer flex justify-center items-center gap-4 text-white "
            >
              <img
                className="w-[100px] h-[100px] mt-4 rounded-full"
                src={logo}
                alt="LOGO"
              />
              <h1 className="font-bold text-4xl tracking-wide text-yellow-500">
                VietNam Mind Game
              </h1>
            </a>
          </div>
          <div className="w-full px-24 mt-6 pb-24">
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
          </div>
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

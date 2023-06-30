import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Helmet } from "react-helmet";
import { Route, Routes } from "react-router-dom";
import mainRoutes from "./routes/routes";
import LayoutHome from "./layout/layout-home/LayoutHome";

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>VMG Project</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content="Helmet application" />
      </Helmet>
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
  );
}

export default App;

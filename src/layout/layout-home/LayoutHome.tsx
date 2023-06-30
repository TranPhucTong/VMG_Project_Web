import React, { ReactNode } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

type LayoutHomeProps = {
  children: ReactNode;
};
const LayoutHome = ({ children }: LayoutHomeProps) => {
  return (
    <div>
      <Header />
      <div className="">{children}</div>
      <Footer />
    </div>
  );
};

export default LayoutHome;

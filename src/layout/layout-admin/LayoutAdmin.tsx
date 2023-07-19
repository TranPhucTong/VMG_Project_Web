import React, { ReactNode } from "react";
import Navbar from "./navbar/Navbar";
import HeaderAdmin from "./header/HeaderAdmin";

type LayoutAdminProps = {
  children: ReactNode;
};

const LayoutAdmin = ({ children }: LayoutAdminProps) => {
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full">
        <HeaderAdmin />
        <div className="bg-[#f4f4f9] text-xl text-gray-900 w-full p-6 min-h-screen">
          <div className="">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default LayoutAdmin;

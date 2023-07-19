import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faSearch, faGear, faBell } from "@fortawesome/free-solid-svg-icons";
import avtAdmin from "../../../images/avtadmin.png";

const HeaderAdmin = () => {
  return (
    <header className="w-full h-16 flex justify-end px-6 gap-8 items-center">
      <FontAwesomeIcon
        className="text-2xl cursor-pointer text-gray-600"
        icon={faSearch}
      />
      <FontAwesomeIcon
        className="text-2xl cursor-pointer text-gray-600"
        icon={faGear}
      />
      <FontAwesomeIcon
        className="text-2xl cursor-pointer text-gray-600"
        icon={faBell}
      />
      <div className="flex justify-center items-center gap-2 cursor-pointer hover:border-blue-700">
        <img
          className="rounded-full p-[2px] border-[2px] border-green-400 hover:border-green-500 w-10 h-10"
          src={avtAdmin}
          alt="avt_Admin"
        />
        <div className="text-left">
          <h3 className="font-bold">Trần Phúc Tông</h3>
          <p>Quản trị viên</p>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;

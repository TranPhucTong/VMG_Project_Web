import React, { useState, useEffect } from "react";
// import logo from "../../images/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import panner from "../../images/paner.png";
import { useNavigate, useLocation } from "react-router-dom";
import logoVMG from '../../images/logoVMG.png'
import LanguageSelect from "../components-page/LanguageSelect";
import './Header.css'

const Header = () => {
  const items = [
    { name: "home", path: "/" },
    { name: "news", path: "/news" },
    { name: "tournaments", path: "/tournaments" },
    { name: "ranking", path: "/ranking" },
    { name: "shop", path: "/shop" },
    { name: "about us", path: "/about-us" },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState<string>("");

  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = items.find((item) => item.path === currentPath);
    setSelectedItem(currentItem ? currentItem.name : "");
  }, [location]);

  const handleItemClick = (item: string, path: string) => {
    setSelectedItem(item);
    navigate(path);
  };
  return (
    <div className="flex justify-between items-center">
      <div className="w-[50%] px-7 py-16">
        <img src={logoVMG} className="w-[300px] h-auto object-cover" alt="Logo VMG" />
      </div>
      <div className="w-[50%] flex flex-col gap-2 pr-20">
        <div className="w-full h-auto text-white flex justify-center items-center">
          <div className="w-full flex justify-between items-center cursor-pointer">
            {items.map((item, index) => (
              <div key={index}>
                <h2
                  className={`uppercase font-extrabold text-xl text-header transition-all duration-150 ease-linear  ${selectedItem === item.name ? "gradient-text-vertical border-b-[1px] border-yellow-400" : ""
                    }`}
                  onClick={() => handleItemClick(item.name, item.path)}
                >
                  {item.name}
                </h2>
              </div>
            ))}
            <LanguageSelect />
          </div>
        </div>
        <div className="text-white flex justify-start items-center">
          <div className="flex justify-center items-center">
            <FontAwesomeIcon className="font-bold text-2xl cursor-pointer" icon={faSearch} />
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-1 text-xl text-black focus:outline-none"
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Header;

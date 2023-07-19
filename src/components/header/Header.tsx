import React, { useState, useEffect } from "react";
// import logo from "../../images/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import panner from "../../images/paner.png";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const items = [
    { name: "news", path: "/news" },
    { name: "live events", path: "/live-events" },
    { name: "tournaments", path: "/tournaments" },
    { name: "gallery", path: "/gallery" },
    { name: "market", path: "/market" },
    { name: "ranking", path: "/ranking" },
    { name: "poll", path: "/poll" },
    { name: "shop", path: "/shop" },
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
    <div>
      <div className="w-full bg-black text-white  py-6">
        <div className="font-bold text-6xl">
          Bluff & <span className="text-[#00ff64]">Catch</span>
        </div>
        <div className="mt-3 text-2xl">Poker News and Live Tournaments</div>
      </div>
      <div className="w-full h-[50px] bg-[#333333] flex justify-start items-center">
        <div className="flex w-52 h-full justify-center items-center text-white cursor-pointer bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-r-full">
          <div className="font-bold text-xl">Ongoing Events</div>
        </div>
        <div className="flex px-6 h-[25px] justify-center items-center text-white hover:text-[#00ff64] cursor-pointer border-r-2 border-gray-300">
          <div className="font-bold text-xl">WSOP</div>
        </div>
        <div className="flex px-6 h-[25px] justify-center items-center text-white hover:text-[#00ff64] cursor-pointer border-r-2 border-gray-300">
          <div className="font-bold text-xl">Wynn Summer Classic</div>
        </div>
        <div className="flex px-6 h-[25px] justify-center items-center text-white hover:text-[#00ff64] cursor-pointer border-r-2 border-gray-300">
          <div className="font-bold text-xl">Deepstack Championship</div>
        </div>
      </div>
      <div className="w-full h-auto py-8 px-10 bg-white flex justify-center items-center">
        <div className="w-full flex justify-between pb-4 items-center cursor-pointer border-black border-b-2">
          {items.map((item, index) => (
            <div key={index}>
              <h2
                className={`uppercase font-extrabold text-xl text-black hover:text-green-600 ${
                  selectedItem === item.name ? "text-green-600" : ""
                }`}
                onClick={() => handleItemClick(item.name, item.path)}
              >
                {item.name}
              </h2>
            </div>
          ))}
          <div className="flex justify-center items-center">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-1 text-xl focus:outline-none"
            />
            <FontAwesomeIcon className="font-bold text-2xl" icon={faSearch} />
          </div>
        </div>
      </div>
      <div className="w-full mb-8 flex justify-center items-center">
        <a
          className="w-[60%]"
          href="https://hl.spolive.com/?utm_source=bluff&catch&utm_medium=banner&utm_campaign=top"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={panner} alt="Paner VMG" className="object-cover " />
        </a>
      </div>
    </div>
    // <div className="flex justify-center items-center">
    //   <a
    //     href="https://www.facebook.com/vmg.corona"
    //     target="_blank"
    //     rel="noopener noreferrer"
    //     className="cursor-pointer flex justify-center items-center gap-4 text-white "
    //   >
    //     <img
    //       className="w-[100px] h-[100px] mt-4 rounded-full"
    //       src={logo}
    //       alt="LOGO"
    //     />
    //     <h1 className="font-bold text-4xl tracking-wide text-yellow-500">
    //       VietNam Mind Game
    //     </h1>
    //   </a>
    // </div>
  );
};

export default Header;

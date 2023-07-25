import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faHome,
  faPeopleLine,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const menus = [
    {
      name: "Home",
      link: "/admin/home",
      icon: faHome,
    },
    {
      name: "Player",
      link: "/admin/player",
      icon: faPeopleLine,
    },
    {
      name: "Events",
      link: "/admin/events",
      icon: faCalendar,
    },
    // {
    //   name: "analytics",
    //   link: "/",
    //   icon: faX,
    // },
    // {
    //   name: "File Manager",
    //   link: "/",
    //   icon: faX,
    // },
  ];

  const [open, setOpen] = useState(true);
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState<string>("");
  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = menus.find((item) => item.link === currentPath);
    setSelectedItem(currentItem ? currentItem.name : "");
    if (location.pathname.includes("/admin/player")) {
      setSelectedItem("Player");
    }
  }, [location]);

  return (
    <div
      className={`bg-gradient-to-r from-[#2b343e] to-[#455260] min-h-screen ${
        open ? "w-72" : "w-16"
      } duration-500 text-gray-100 px-4`}
    >
      <div className="py-3 flex justify-end">
        <FontAwesomeIcon
          icon={faList}
          className="cursor-pointer text-2xl"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="mt-4 flex flex-col gap-4 relative">
        {menus?.map((menu, i) => (
          <Link
            to={menu?.link}
            key={i}
            className={` group pr-8 flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-400 rounded-md ${
              selectedItem === menu.name ? "bg-white text-[#244785]" : ""
            }`}
          >
            <div>
              <FontAwesomeIcon
                className="text-xl transition-all ease-linear duration-500"
                icon={menu?.icon}
              />
            </div>

            <h2
              style={{
                transitionDelay: `${i + 3}00ms`,
              }}
              className={`whitespace-pre transition-all ease-linear duration-500 text-xl ${
                !open && "opacity-0 translate-x-28 overflow-hidden "
              }`}
            >
              {menu?.name}
            </h2>

            <h2
              className={`${
                open && "hidden"
              } absolute  left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              {menu?.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;

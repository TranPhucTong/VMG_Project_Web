import React, { useState } from "react";
import "../home/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import panner from "../../images/paner.png";
import top10 from "../../images/Top-10-Poker.png";
import barcelona2023 from "../../images/poker-barcelona-2023.png";
import pcttour from "../../images/PCT-logo_.png";
import player1 from "../../images/player1.png";
import player2 from "../../images/player2.png";
import player3 from "../../images/player3.png";

const Home = () => {
  const items = [
    "news",
    "live events",
    "tournaments",
    "gallery",
    "market",
    "ranking",
    "poll",
    "shop",
  ];
  const newsRight = [
    {
      id: 1,
      title: "[6/29] Las Vegas Daily Recap. Thank!",
      content: "Thông tin chi tiết về giải Poker Las Vegas mở rộng!!!",
      author: "wsop",
      image: player1,
    },
    {
      id: 2,
      title: "[6/29] Las Vegas Daily Recap. Thank!",
      content: "Thông tin chi tiết về giải Poker Las Vegas mở rộng!!!",
      author: "wsop",
      image: player2,
    },
    {
      id: 3,
      title: "[6/29] Las Vegas Daily Recap. Thank!",
      content: "Thông tin chi tiết về giải Poker Las Vegas mở rộng!!!",
      author: "player news",
      image: player3,
    },
  ];
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const handleItemHover = (index: number) => {
    setHoveredItem(index);
  };

  const handleItemLeave = () => {
    setHoveredItem(null);
  };
  return (
    <div className="w-full mt-6">
      <div className="bg-white w-full h-auto">
        <div className="flex px-10 cursor-pointer">
          <div className="w-1/3  flex flex-col gap-6 pr-4 border-r-[1px] border-gray-300">
            <div className="w-full">
              <div className="relative">
                <img
                  src={top10}
                  className="w-full h-[200px] object-cover"
                  alt="Top10 Tuyển thủ Á Quân"
                />
                <p className="px-6 py-2 font-medium tracking-wide absolute bg-red-600 text-white uppercase rounded-br-3xl -bottom-6">
                  poker ranking
                </p>
              </div>
              <div className="mt-8">
                <h3 className="text-left text-xl font-bold">
                  2023 tuyển thủ Poker Trần Phúc Tông đã xuất sắc giành được
                  giải quán quân.
                </h3>
              </div>
            </div>
            <div className="w-full">
              <div className="relative">
                <img
                  src={barcelona2023}
                  className="w-full h-[200px] object-cover"
                  alt="Top10 Tuyển thủ Á Quân"
                />
                <p className="px-6 py-2 font-medium tracking-wide absolute bg-blue-400 text-white uppercase rounded-br-3xl -bottom-6">
                  ept barcelona
                </p>
              </div>
              <div className="mt-8">
                <h3 className="text-left text-xl font-bold">
                  2023 tuyển thủ Poker Trần Phúc Tông đã xuất sắc giành được
                  giải á quân.
                </h3>
              </div>
            </div>
          </div>
          <div className="w-2/3 px-4 border-r-[1px] border-gray-300 group">
            <div className="w-full">
              <img
                src={pcttour}
                alt="PCT Champion Tour"
                className="w-full h-[450px] object-cover"
              />
            </div>
            <div>
              <p className="px- py-2 w-[40%] font-medium tracking-wide  bg-green-700 text-white uppercase rounded-br-3xl">
                tournaments
              </p>
            </div>
            <div className="mt-6">
              <h1 className="text-2xl font-medium text-left group_hover transition-colors ease-linear duration-200 cursor-pointer">
                Chào mừng bạn đến với PCT Season 2 lần thứ 7!!!
              </h1>
            </div>
            <div className="mt-6 h-12">
              <div className="overflow-hidden">
                <p className="line-clamp-2 text-left font-light text-xl">
                  Khi đoạn văn bản dài trên một dòng, dấu ba chấm sẽ không xuất
                  hiện. Khi đoạn văn bản vượt quá chiều rộng của phần tử và bị
                  cắt ngắn, dấu ba chấm sẽ xuất hiện ở cuối để chỉ ra rằng văn
                  bản bị cắt ngắn. Lưu ý rằng bạn cần thay thế className bằng
                  class nếu bạn không sử dụng JSX trong ứng dụng React.
                </p>
              </div>
            </div>
          </div>
          <div className="w-1/3 flex flex-col gap-8 ml-4 text-left">
            {newsRight.map((newRight, index) => (
              <div
                key={newRight.id}
                className={`border-b-[1px] border-gray-300  pb-6 
               
                `}
                onMouseEnter={() => handleItemHover(index)}
                onMouseLeave={handleItemLeave}
              >
                <h2
                  className={`text-left text-xl font-bold transition-colors duration-200 ease-in-out  ${
                    index === hoveredItem ? "text-green-700" : "text-black"
                  }`}
                >
                  {newRight.title}
                </h2>
                <div className="flex flex-row justify-between items-center w-auto mt-4">
                  <div className="w-[70%]">
                    <h3 className="">{newRight.content}</h3>
                    <h3 className="uppercase font-medium text-lg text-red-500 mt-3">
                      {newRight.author}
                    </h3>
                  </div>
                  <div className="w-[30%]">
                    <img
                      src={newRight.image}
                      alt=""
                      className="w-[100px] h-[100px] object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full py-14 flex justify-center items-center">
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
    </div>
  );
};

export default Home;

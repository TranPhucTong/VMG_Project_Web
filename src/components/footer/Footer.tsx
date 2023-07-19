import React from "react";
import bluffLogo from "../../images/bi.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faInstagram,
  faTelegram,
  faBlogger,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="border-t-2 border-black mx-8 mt-8 py-12">
      <div className="flex">
        <div className="w-1/3 px-4 border-r-[1px] border-gray-300 flex flex-col items-center">
          <img
            src={bluffLogo}
            alt="BluffLogo"
            className="w-[100px] h-[100px] object-cover"
          />
          <div className="relative  font-medium mt-4">
            <span className="text-lg">BLUFF &amp; CATCH</span>
            <span className="text-[10px] absolute top-0 -right-5">TM</span>
          </div>
          <div className="mt-8 text-gray-500 text-base">
            <p>BlankHill Entertainment Inc.</p>
            <p>©2023 Bluff&Catch All Rights Reserved.</p>
          </div>
        </div>
        <div className="w-1/3 px-8 border-r-[1px] border-gray-300 text-left">
          <h3 className="text-xl font-medium uppercase">about us</h3>
          <div className="font-semibold tracking-wide text-base text-gray-400">
            <p className="mb-6">
              Bluff&Catch는 포커 콘텐츠 전문 미디어입니다. <br />
              전세계적으로 마인드스포츠로서 인정받고 있는 Texas Hold'em 종목을
              중심으로 다양하고 재미있는 콘텐츠를 제작하고 있으며, 국내외
              토너먼트 대회 및 업계뉴스를 제공하고 있습니다.
            </p>
            <p className="mb-6">
              제호 : 블러프앤캐치{" "}
              <span className="p-1 text-lg text-gray-300 font-light">|</span>{" "}
              등록번호 : 서울, 아54460 <br />
              등록(발행)일자 : 2022년 9월 13일{" "}
              <span className="p-1 text-lg text-gray-300 font-light">|</span>
              발행·편집인 : 박준영 <br />
              청소년보호책임자 : 박준영
            </p>
            <div className="flex w-full justify-between gap-4 mb-6">
              <a
                href="#"
                className="hover:text-green-500 hover:underline text-sm"
              >
                Terms of Use
              </a>
              <a
                href="#"
                className="hover:text-green-500 hover:underline text-sm"
              >
                콘텐츠보호안내
              </a>
              <a
                href="#"
                className="hover:text-green-500 hover:underline text-sm"
              >
                청소년보호정책
              </a>
            </div>
            <div>
              <p> 블랭크힐엔터테인먼트㈜ 대표이사 박준영</p>
              <p>사업자등록번호 : 222-88-02455</p>
              <p>서울시 성동구 서울숲4길 12-7, 2층</p>
            </div>
          </div>
        </div>
        <div className="w-1/3 px-8 text-left">
          <div className="mb-6">
            <h3 className="text-xl font-medium uppercase">career</h3>
            <div className="font-semibold tracking-wide text-base text-gray-400">
              <p>우리와 함께 새로운 커리어를 개척할 멤버를 찾습니다.</p>
              <p>모집분야 : 콘텐츠마케터, 웹디자이너, 객원기자</p>
              <p>수시지원 : allin@bluffcatch.com</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-medium uppercase">official channel</h3>
            <div className="flex justify-between w-[30%] gap-6 mt-2 text-4xl mb-6">
              <FontAwesomeIcon
                className="cursor-pointer"
                icon={faInstagram}
                title="instagram"
              />
              <FontAwesomeIcon
                className="cursor-pointer"
                icon={faTelegram}
                title="telegram"
              />
              <FontAwesomeIcon
                className="cursor-pointer"
                icon={faBlogger}
                title="blog"
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-medium uppercase">contact us</h3>
            <div className="font-semibold tracking-wide text-base text-gray-400">
              <p>뉴스제보, 제휴/홍보/광고 및 기타문의</p>
              <p>카카오톡ID : bluffcatch</p>
              <p>텔레그램ID : @bluffcatch</p>
              <p>E-MAIL : allin@bluffcatch.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

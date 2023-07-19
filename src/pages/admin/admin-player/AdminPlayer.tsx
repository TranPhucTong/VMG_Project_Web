import {
  faArrowUpRightDots,
  faArrowUpRightFromSquare,
  faEdit,
  faEllipsis,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useRef } from "react";
import playerApi from "../../../api/playerApi";
import { Navigate, useNavigate } from "react-router-dom";
// import { TableRow } from "@mui/material";

interface TableRow {
  _id: number;
  playerName: string;
  linkInfo: string;
  avatarImage: string;
  totalWinnings: number;
  vpoyPoint: number;
  country: string;
  city: string;
  // rankInCountry: number;
  // rankInCity: number;
  eventJoin: [];
  historyEvent: [];
}
const AdminPlayer = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [data, setData] = useState<TableRow[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);

  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const handleMenuToggle = (rowIndex: number) => {
    setSelectedRow(selectedRow === rowIndex ? null : rowIndex);
  };

  const handleDelete = (row: TableRow) => {
    // Xử lý logic xóa dữ liệu
    console.log("Delete row:", row);
  };

  const handleEdit = (row: TableRow) => {
    // Xử lý logic chỉnh sửa dữ liệu
    console.log("Edit row:", row);
  };

  const clickAddPlayer = async () => {
    navigate("/admin/player-add");
  };

  const fetchData = async () => {
    const res = await playerApi.getPlayer();
    setData(res.data.players);
  };
  useEffect(() => {
    fetchData();
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setSelectedRow(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  let totalPlayer = 0;

  const demMang = () => {
    for (var i = 0; i < data.length; i++) {
      totalPlayer = i + 1;
    }
  };
  demMang();

  // Tính toán số trang dựa trên số hàng trên mỗi trang
  const totalPages: number = Math.ceil(data.length / rowsPerPage);
  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setRowsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };
  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };
  const startIndex: number = (currentPage - 1) * rowsPerPage;
  const endIndex: number = startIndex + rowsPerPage;
  const currentRows: TableRow[] = data.slice(startIndex, endIndex);
  return (
    <div>
      <div className="flex justify-between gap-8 items-center">
        <div className="flex gap-8 justify-center items-center">
          <h1 className="text-3xl font-medium text-left tracking-wide">
            Player
          </h1>
          <p className="font-normal tracking-wide flex gap-1 justify-center items-center text-sm">
            Quantity:{" "}
            <span className="text-blue-400 font-bold">{totalPlayer}</span>
          </p>
        </div>
        <div className="flex gap-4">
          <button
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            onClick={clickAddPlayer}
            className="flex gap-2 justify-center items-center text-xl hover:text-green-500 px-4 py-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            <p className="">Add</p>
          </button>
          <button className="flex gap-2 justify-center items-center text-xl hover:text-green-500 px-4 py-2">
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            <p>Import</p>
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-lg bg-white shadow-xl">
        <div className="text-left p-6 border-b border-solid md:flex-row md:items-center md:gap-0 border-secondary text-sm md:text-base">
          <span>Show rows per page:</span>
          <select
            className="ml-1 px-2 py-1 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>

        <div className="overflow-x-auto pb-14">
          <table className="w-full text-sm text-dark-purple transition-all duration-500 ease-in-out ">
            {/* Render các hàng trong bảng */}
            <thead>
              <tr className="border-b border-solid border-gray-400">
                <th className=" px-[16px] py-[20px] text-left min-w-[80px] pl-[24px] pr-[8px]">
                  <input
                    type="checkbox"
                    className="w-4 h-4 relative top-[2px] cursor-pointer"
                  />
                </th>
                <th className="px-[16px] py-[20px] text-center min-w-[80px]">
                  STT
                </th>
                <th className="px-[16px] py-[20px] text-center min-w-[80px]">
                  Player Name
                </th>
                <th className="px-[16px] py-[20px] text-center min-w-[80px]">
                  Total Winnings
                </th>
                <th className="px-[16px] py-[20px] text-center min-w-[80px]">
                  Vpoy Point
                </th>
                <th className="px-[16px] py-[20px] text-center min-w-[80px]">
                  Country
                </th>
                <th className="px-[16px] py-[20px] text-center min-w-[80px]">
                  City
                </th>
                <th className="px-[16px] py-[20px] text-center min-w-[80px]">
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b-[5px] shadow-sm border-solid border-[#f4f4f9]
                  ${
                    index % 2 === 0
                      ? "border-l-4 border-l-blue-500"
                      : "border-l-4 border-l-green-500"
                  }
                  `}
                >
                  <td className=" px-[16px] py-[20px] text-left min-w-[80px] pl-[24px] pr-[8px]">
                    <input
                      className="w-4 h-4 relative top-[2px] cursor-pointer"
                      type="checkbox"
                    />
                  </td>
                  <td className="px-[16px] py-[20px] text-center min-w-[80px]">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-[16px] flex justify-center items-center gap-2 py-[20px] text-center min-w-[80px] underline cursor-pointer hover:text-blue-500 font-medium transition-all duration-100 ease-in-out">
                    <img
                      src={row.avatarImage}
                      className="rounded-full object-cover w-10 h-10"
                      alt=""
                    />
                    <a title="Info player" href={row.linkInfo}>
                      {row.playerName}
                    </a>
                  </td>
                  <td className="px-[16px] py-[20px] text-center min-w-[80px]">
                    {row.totalWinnings}
                  </td>
                  <td className="px-[16px] py-[20px] text-center min-w-[80px]">
                    {row.vpoyPoint}
                  </td>
                  <td className="px-[16px] py-[20px] text-center min-w-[80px]">
                    {row.country}
                  </td>
                  <td className="px-[16px] py-[20px] text-center min-w-[80px]">
                    {row.city}
                  </td>
                  <td className="px-[16px] py-[20px] text-center min-w-[80px] relative">
                    <FontAwesomeIcon
                      className="cursor-pointer text-xl p-2 text-gray-400"
                      icon={faEllipsis}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleMenuToggle(index);
                      }}
                    />
                    {selectedRow === index && (
                      <div
                        ref={menuRef}
                        className="absolute top-4 z-10 right-2 mt-8"
                      >
                        <div className="bg-[#efefef] rounded-2xl relative shadow-md shadow-gray-300 px-6 py-2 text-left">
                          <div className="relative">
                            <div className="absolute top-[-11px] right-[6px] transform -translate-x-1/2 bg-[#efefef] w-3 h-3 rotate-45"></div>
                          </div>
                          <button
                            className=" flex gap-3 justify-center items-center hover:text-[#2a4c87] w-full text-left px-4 py-2 text-gray-700 "
                            onClick={() => handleEdit(row)}
                          >
                            <FontAwesomeIcon
                              className="text-xl"
                              icon={faEdit}
                            />
                            <p className="font-bold">Edit</p>
                          </button>
                          <button
                            className="flex gap-3 justify-center hover:text-[#f45d5d] items-center w-full text-left px-4 py-2 text-red-600 "
                            onClick={() => handleDelete(row)}
                          >
                            <FontAwesomeIcon
                              className="text-xl"
                              icon={faTrash}
                            />
                            <p className="font-bold">Delete</p>
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center pb-12 justify-center">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                className={`ml-2 px-3 py-1 text-sm rounded-md border focus:outline-none focus:ring focus:border-blue-300 ${
                  page === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700"
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPlayer;

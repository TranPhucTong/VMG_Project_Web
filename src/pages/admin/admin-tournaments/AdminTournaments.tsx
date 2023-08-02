import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { toast } from "react-toastify";
import storage from "../../../firebase/firebase";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import InputAdmin from '../../../components/components-admin/InputAdmin';
import OrganizationalCheckbox from '../../../components/components-admin/OrganizationalCheckbox';
import ButtonAdmin from '../../../components/components-admin/ButtonAdmin';
import adminTournamentsApi from '../../../api/adminTournamentsApi';
import { faEdit, faEllipsis, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface TournamentsCreat {
  nameTour: string;
  dayStart: string;
  dayEnd: string;
  image: string;
  venueTour: string;
  pokerTourId: string;
  pokerRoomId: string;
}

interface PokerRooms {
  _id: string;
  name: string;
  shortName: string;
  logo: string;
  avatar: string;
  description: string;
  Adress: string;
}

interface PokerTours {
  _id: string;
  name: string;
  shortName: string;
  logo: string;
  avatar: string;
  description: string;
}
const formatDate = (dateString: string) => {
  const dateObj = new Date(dateString);
  return dateObj.toLocaleDateString("en-GB");
};

const AdminTournaments = () => {
  const [selectedImageTour, setSelectedImageTour] = useState<string | null>("");
  const [nameTour, setNameTour] = useState("");
  const [dateTourStart, setDateTourStart] = useState("")
  const [dateTourEnd, setDateTourEnd] = useState("");
  const [venueEvent, setVenueEvent] = useState("");

  const [isChecked, setIsChecked] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(true);

  const [selectedPokerTour, setSelectedPokerTour] = useState<PokerTours | null>(null);
  const [selectedPokerRoom, setSelectedPokerRoom] = useState<PokerRooms | null>(null);


  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const menuRef = useRef<HTMLDivElement>(null);


  const [dataTournaments, setDataTournaments] = useState<TournamentsCreat[]>([]);


  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        // Tạo tham chiếu đến thư mục lưu trữ ảnh (ví dụ: images) trên Firebase Storage
        const storageRef = ref(storage, "Avt_Player_VMG/" + file.name);

        // Upload ảnh lên Firebase Storage
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Lắng nghe sự kiện upload thành công và lấy đường dẫn ảnh sau khi upload
        uploadTask.on(
          "state_changed",
          null,
          (error: any) => {
            console.error("Error uploading image:", error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setSelectedImageTour(downloadURL); // Lưu đường dẫn ảnh sau khi upload vào state selectedImage
            });
          }
        );
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleNameTourChange = (value: string | number) => {
    setNameTour(String(value));
  };
  const handlDateTourStartChange = (value: string | number) => {
    setDateTourStart(String(value));
  };
  const handlDateTourEndChange = (value: string | number) => {
    setDateTourEnd(String(value));
  };
  const handlePokerTourChange = (tour: PokerTours | null) => {
    setSelectedPokerTour(tour);
  };

  const handlePokerRoomChange = (room: PokerRooms | null) => {
    setSelectedPokerRoom(room);
  };

  const handleVenueCheckboxChange = () => {
    setIsChecked((prev) => !prev); // Đảo ngược trạng thái của ô checkbox
    if (!isChecked && selectedPokerRoom) {
      // Nếu ô checkbox trước đó không được tích và có selectedPokerRoom, gán giá trị của selectedPokerRoom.Adress cho venueEvent
      setVenueEvent(selectedPokerRoom.Adress);
    } else {
      // Nếu ô checkbox trước đó được tích hoặc không có selectedPokerRoom, đặt venueEvent về rỗng
      setVenueEvent("");
    }
  };

  const handlEvenueEventtChange = (value: string | number) => {
    if (!isChecked) {
      // Nếu ô checkbox không được tích, cập nhật giá trị cho venueEvent
      setVenueEvent(String(value));
    }
  };

  const defauthValue = () => {
    setNameTour("");
    setDateTourStart("");
    setDateTourEnd("");
    setSelectedImageTour("");
    setVenueEvent("");
    setIsChecked(false);
  };
  useEffect(() => {
    if (nameTour !== "" && dateTourStart !== "" && dateTourEnd !== "" && venueEvent !== "" && selectedImageTour !== "") {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [nameTour, venueEvent, dateTourStart, dateTourEnd, selectedImageTour]);
  const clickAddTournament = async () => {
    const dataCreate: Object = {
      nameTour: nameTour,
      dayStart: dateTourStart,
      dayEnd: dateTourEnd,
      image: selectedImageTour,
      venueTour: venueEvent,
      pokerTourId: selectedPokerTour ?  selectedPokerTour._id : undefined,
      pokerRoomId: selectedPokerRoom ? selectedPokerRoom._id : undefined,
    };
    try {
      const response = await adminTournamentsApi.createTournaments(dataCreate);
      console.log("Thành công", response);
      toast.success("Create Tournaments successfully");
      defauthValue();
    } catch (error) {
      console.log("Thất bại", error);
      toast.error("Create failure. Please check your input again!!!")
    }
  };
  const handleDelete = async (tournaments: any) => {
    try {
      const res = await adminTournamentsApi.deleteTournament(tournaments._id);
      console.log(res);
      toast.success("Xóa event thành công");
      setCurrentPage(1); 
    } catch (error) {
      console.log(error);
      toast.error("Xóa thất bại ")
    }
  }

  const fetchData = async () => {
    const res = await adminTournamentsApi.getAllTournaments();
    setDataTournaments(res.data.data);
  };


  const totalPages: number = Math.ceil(dataTournaments.length / rowsPerPage);
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
  const currentRows: TournamentsCreat[] = dataTournaments.slice(startIndex, endIndex);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const handleMenuToggle = (rowIndex: number) => {
    setSelectedRow(selectedRow === rowIndex ? null : rowIndex);
  };

  let totalTournaments = 0;

  const demMang = () => {
    for (var i = 0; i < dataTournaments.length; i++) {
      totalTournaments = i + 1;
    }
  };
  demMang();

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
  }, [dataTournaments]);

  function truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }
  return (
    <div>
      <div className="flex justify-between gap-8 items-center">
        <div className="flex gap-8 justify-center items-center">
          <h1 className="text-3xl font-medium text-left tracking-wide">
            Tournaments
          </h1>
          <p className="font-normal tracking-wide flex gap-1 justify-center items-center text-sm">
            Quantity:{" "}
            <span className="text-blue-400 font-bold">20</span>
          </p>
        </div>
      </div>
      <div className="mt-5 rounded-lg bg-white shadow-xl">
        <div className='px-8 py-4 text-left'>
          <h1 className='text-2xl font-bold text-left'>Create New Tournament</h1>
        </div>
        <div className='px-8 pb-4 flex gap-6 h-auto'>
          <div className='flex flex-col justify-center items-center w-[50%]'>
            <div className='w-full flex-col flex gap-3'>
              <div className="flex flex-col w-full items-center">
                <div
                  className={`rounded-full overflow-hidden w-48 h-48 border-4 ${selectedImageTour ? "border-green-500" : "border-gray-500"
                    }`}
                >
                  {selectedImageTour ? (
                    <img
                      src={selectedImageTour}
                      alt="Selected Image"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex justify-center items-center text-gray-500 text-lg">
                      No image selected
                    </div>
                  )}
                </div>
                <label
                  htmlFor="image-input"
                  className="mt-4 px-4 py-2 bg-blue-500 text-base rounded-2xl text-white font-bold cursor-pointer custom-file-input"
                >
                  Edit Image Tournament
                  <input
                    type="file"
                    id="image-input"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <InputAdmin
                type="text"
                value={nameTour}
                onChange={handleNameTourChange}
                label="Name Tour"
                // validate={(value) => /^[A-Za-z\s]+$/.test(namePlayer)}
                placeholder="Vui lòng nhập tên ở đây"
              />
            </div>
          </div>
          <div className='flex flex-col justify-center h-full items-center w-[50%]'>
            <div className='w-full flex-col justify-between h-full flex gap-3'>
              <div className='flex justify-start gap-8 items-center'>
                <div className='w-[50%]'>
                  <InputAdmin
                    type="date"
                    value={dateTourStart}
                    onChange={handlDateTourStartChange}
                    label="Date Tournament Start"
                    placeholder="Vui lòng nhập ở đây"
                  />
                </div>
                <div className='mt-6'>-</div>
                <div className='w-[50%]'>
                  <InputAdmin
                    type="date"
                    value={dateTourEnd}
                    onChange={handlDateTourEndChange}
                    label="Date Tournament End"
                    placeholder="Vui lòng nhập ở đây"
                  />
                </div>
              </div>
              <div className=''>
                <OrganizationalCheckbox onPokerTourChange={handlePokerTourChange}
                  onPokerRoomChange={handlePokerRoomChange} />
              </div>
              <div className='flex justify-between gap-2 items-center'>
                <div className='w-[70%]'>
                  <InputAdmin
                    type="text"
                    value={isChecked ? selectedPokerRoom?.Adress || "" : venueEvent}
                    onChange={handlEvenueEventtChange}
                    label="Venue Event"
                    placeholder="Vui lòng nhập ở đây"
                  />
                </div>
                {selectedPokerRoom !== null ? (
                  <div className='w-[30%] flex mt-6 gap-1 justify-center items-center'>
                    <input
                      type="checkbox"
                      checked={isChecked} // Đảm bảo checkbox được chọn khi có selectedPokerRoom
                      onChange={handleVenueCheckboxChange}
                    />
                    <p>Adress Poker Room</p>
                  </div>
                ) : ("")}

              </div>
              <div className='mt-4 pb-4 flex justify-center items-center w-[full] gap-6'>
                <ButtonAdmin
                  isFormComplete={isFormComplete}
                  color="blue" onClick={clickAddTournament} >
                  Add New Tournament
                </ButtonAdmin>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-lg bg-white shadow-xl">
        <div className='px-8 py-4 text-left'>
          <h1 className='text-2xl font-bold text-left'>List Tournaments</h1>
        </div>
        <div className="text-left p-6 border-b flex justify-between items-center border-solid md:flex-row md:items-center md:gap-0 border-secondary text-sm md:text-base">
          <div>
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
                  Tournament Name
                </th>
                <th className="px-[16px] py-[20px] text-center min-w-[80px]">
                  Date Start
                </th>
                <th className="px-[16px] py-[20px] text-center min-w-[80px]">
                  Date End
                </th>
                <th className="px-[16px] py-[20px] text-center min-w-[80px]">
                  Venue Event
                </th>
                {/* <th className="px-[16px] py-[20px] text-center min-w-[80px]">
                  Organizational
                </th> */}
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
                  ${index % 2 === 0
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
                  <td
                    //  onClick={() => handleSelectDetailsEvent(row)} 
                    className="px-[16px] py-[20px] text-center min-w-[80px] underline cursor-pointer hover:text-blue-500 font-medium transition-all duration-100 ease-in-out">
                    {row.nameTour}
                  </td>
                  <td className="px-[16px] py-[20px] text-center  font-bold text-blue-400 min-w-[80px]">
                  {formatDate(row.dayStart)}
                  </td>
                  <td className="px-[16px] py-[20px] text-center font-bold text-green-400 min-w-[80px]">
                  {formatDate(row.dayEnd)}
                  </td>
                  <td className="px-[16px] py-[20px] text-center min-w-[80px]">
                    {truncateText(row.venueTour, 20)}
                  </td>
                  {/* <td className="px-[16px] py-[20px] font-bold text-orange-500 text-center min-w-[80px]">
                    {row.pokerTour.shortName} <span className='text-gray-400'>/</span>  {row.pokerRoom.shortName} 
                  </td> */}
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
                className={`ml-2 px-3 py-1 text-sm rounded-md border focus:outline-none focus:ring focus:border-blue-300 ${page === currentPage
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
  )
}

export default AdminTournaments

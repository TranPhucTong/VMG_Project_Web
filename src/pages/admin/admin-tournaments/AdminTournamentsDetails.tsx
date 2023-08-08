import { faChevronLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import adminTournamentsApi from "../../../api/adminTournamentsApi";
import axios from "axios";
import configRoutes from "../../../config/configRouter";
import ButtonAdmin from "../../../components/components-admin/ButtonAdmin";
import InputAdmin from "../../../components/components-admin/InputAdmin";
import OrganizationalCheckbox from "../../../components/components-admin/OrganizationalCheckbox";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import storage from "../../../firebase/firebase";
import { toast } from "react-toastify";

interface EventTournament {
  _id: number;
  nameEvent: string;
  buyIn: number;
  venueEvent: string;
  dateEvent: string;
  entries: number;
  tourementID: string;
  pokerRoom: PokerRooms;
  pokerTour: PokerTours;
  resultsPrize: [];
}

type EventTournamentArray = EventTournament[];

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

interface TournamentID {
  _id: string;
  nameTour: string;
  dayStart: string;
  dayEnd: string;
  image: string;
  pokerTour: PokerTours;
  pokerRoom: PokerRooms;
  venueTour: string;
  Schedule: [];
}

const AdminTournamentsDetails = () => {
  const { id } = useParams();
  const [dataTournamentID, setDataTournamentID] = useState<TournamentID | null>(
    null
  );

  const [nameTour, setNameTour] = useState("");
  const [dayStart, setDayStart] = useState("");
  const [dayEnd, setDayEnd] = useState("");
  const [image, setImage] = useState("");
  const [pokerRoom, setPokerRoom] = useState<PokerRooms | null>(null);
  const [pokerTour, setPokerTour] = useState<PokerTours | null>(null);
  const [venueTour, setVenueTour] = useState("");
  const Schedule: EventTournamentArray = (dataTournamentID?.Schedule ??
    []) as EventTournamentArray;

  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const clickShowUpdate = () => {
    setShowModalUpdate(true);
  };

  const tableClass = "table w-full border-collapse table-auto";
  const tableHeaderClass =
    "bg-gray-200 text-gray-600 uppercase text-sm leading-normal";
  const tableRowClass = "border bg-white hover:bg-gray-100";

  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("en-GB");
  };

  const handleGoBack = () => {
    window.history.back();
  };
  const fetchData = async () => {
    try {
      if (typeof id === "string") {
        const res = await adminTournamentsApi.getTournamentByID(id);
        setDataTournamentID(res.data.tourement);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(dataTournamentID);

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    if (dataTournamentID) {
      setNameTour(dataTournamentID.nameTour);
      setDayStart(dataTournamentID.dayStart);
      setDayEnd(dataTournamentID.dayEnd);
      setImage(dataTournamentID.image);
      setVenueTour(dataTournamentID.venueTour);
      setPokerRoom(dataTournamentID.pokerRoom);
      setPokerTour(dataTournamentID.pokerTour);
    }
  }, [dataTournamentID]);

  const formatDateInput = (dateString: string) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = `${dateObj.getMonth() + 1}`.padStart(2, "0");
    const day = `${dateObj.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  function truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }

  const navigate = useNavigate();
  const handleSelectDetailsEvent = (event: any) => {
    navigate(`${configRoutes.adminEventsDetails}/${event._id}`);
  };

  const exitFormUpdate = () => {
    setShowModalUpdate(false);
    fetchData();
  };
  const [selectedPokerTour, setSelectedPokerTour] = useState<PokerTours | null>(
    pokerTour
  );
  const [selectedPokerRoom, setSelectedPokerRoom] = useState<PokerRooms | null>(
    pokerRoom
  );

  const handleNameEventChange = (value: string | number) => {
    setNameTour(String(value));
  };

  const handlDateTourStartChange = (value: string | number) => {
    setDayStart(String(value));
  };
  const handlDateTourEndChange = (value: string | number) => {
    setDayEnd(String(value));
  };

  const handlePokerTourChange = (tour: PokerTours | null) => {
    setSelectedPokerTour(tour);
  };
  const handlePokerRoomChange = (room: PokerRooms | null) => {
    setSelectedPokerRoom(room);
  };
  const handlEvenueEventtChange = (value: string | number) => {
    if (!isChecked) {
      // Nếu ô checkbox không được tích, cập nhật giá trị cho venueEvent
      setVenueTour(String(value));
    }
  };
  const handleVenueCheckboxChange = () => {
    setIsChecked((prev) => !prev); // Đảo ngược trạng thái của ô checkbox
    if (!isChecked && selectedPokerRoom) {
      // Nếu ô checkbox trước đó không được tích và có selectedPokerRoom, gán giá trị của selectedPokerRoom.Adress cho venueEvent
      setVenueTour(selectedPokerRoom.Adress);
    } else {
      // Nếu ô checkbox trước đó được tích hoặc không có selectedPokerRoom, đặt venueEvent về rỗng
      setVenueTour("");
    }
  };

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
              setImage(downloadURL); // Lưu đường dẫn ảnh sau khi upload vào state selectedImage
            });
          }
        );
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const clickUpdateTournament = async () => {
    const dataUpdateTour: Object = {
      nameTour: nameTour,
      dayStart: dayStart,
      dayEnd: dayEnd,
      image: image,
      pokerTourId: selectedPokerTour ? selectedPokerTour._id : undefined,
      pokerRoomId: selectedPokerRoom ? selectedPokerRoom._id : undefined,
      venueTour: venueTour
    }
    try {
      const response = await adminTournamentsApi.updateInfoTournament(
        id ? id : "",
        dataUpdateTour
      );
      toast.success("Cập nhật thông tin của Tournament thành công");
      fetchData();
      setShowModalUpdate(false);
    } catch (error) {
      toast.error("Cập nhật thông tin Tournament thất bại");
    }

  }

  return (
    <div>
      <div className="flex flex-col gap-1">
        <div
          onClick={handleGoBack}
          className={`flex text-base text-gray-500 font-medium gap-2 items-center cursor-pointer hover:-translate-x-1 transform transition-transform 
          `}
        >
          <FontAwesomeIcon className="font-extrabold" icon={faChevronLeft} />
          <h2>Back</h2>
        </div>
      </div>
      <h1 className="text-4xl font-bold text-center">Tournament Details</h1>
      {/* <div className="w-full flex justify-center gap-2 items-start mt-8"> */}
      <div className="w-full mt-10 flex flex-col gap-4 bg-white rounded-xl shadow-xl px-6 py-4">
        <div className="flex justify-start items-center">
          <h3 className="w-[30%] font-bold text-left text-xl">
            ID Tournament :{" "}
          </h3>
          <p className="text-xl text-blue-500 font-bold w-[70%] text-right">
            {id}
          </p>
        </div>
        <div className="flex justify-start items-center">
          <h3 className="w-[30%] font-bold text-left text-xl">
            Name Tournament :{" "}
          </h3>
          <p className="text-xl text-red-500 font-bold w-[70%] text-right">
            {nameTour}
          </p>
        </div>
        <div className="flex justify-start items-center">
          <h3 className="w-[30%] font-bold text-left text-xl">
            Date Start :{" "}
          </h3>
          <p className="text-xl text-yellow-500 font-bold w-[70%] text-right">
            {formatDate(dayStart)}
          </p>
        </div>
        <div className="flex justify-start items-center">
          <h3 className="w-[30%] font-bold text-left text-xl">Date End : </h3>
          <p className="text-xl text-yellow-500 font-bold w-[70%] text-right">
            {formatDate(dayEnd)}
          </p>
        </div>
        <div className="flex justify-start items-center">
          <h3 className="w-[30%] font-bold text-left text-xl">
            Organizational Units :{" "}
          </h3>
          <div className="flex flex-col justify-center items-end w-[70%]">
            <p className="text-xl text-black font-bold  text-right">
              {pokerTour?.name}{" "}
              <span className="text-green-600">
                ( {pokerTour?.shortName} )
              </span>{" "}
            </p>
            <p className="text-xl text-black font-bold text-right">
              {pokerRoom?.name}{" "}
              <span className="text-green-600">
                ( {pokerRoom?.shortName} )
              </span>{" "}
            </p>
          </div>
        </div>

        <div className="flex justify-start items-center">
          <h3 className="w-[30%] font-bold text-left text-xl">
            Image Tournament :{" "}
          </h3>
          <div className=" w-[70%] flex justify-end items-center">
            <img
              className="w-20 h-10 object-cover"
              src={image}
              alt="Image Tournament"
            />
          </div>
        </div>
        <div className="flex justify-start items-center pb-2 border-b-[1px] border-gray-400">
          <h3 className="w-[30%] font-bold text-left text-xl">
            Venue Tournament :{" "}
          </h3>
          <p className="text-xl text-black font-bold w-[70%] text-right">
            {venueTour}
          </p>
        </div>
        <div className="flex justify-center items-center ">
          <ButtonAdmin
            isFormComplete={true}
            color="blue"
            onClick={clickShowUpdate}
          >
            Update Infomation Tournament
          </ButtonAdmin>
        </div>
      </div>
      <div className="p-2 w-full mt-10 bg-white rounded-xl shadow-xl">
        <div className="mb-4 text-left">
          <h2 className="text-xl font-bold text-teal-500">Schedule</h2>
        </div>
        <table className={`${tableClass} h-full`}>
          <thead>
            <tr>
              <th className={tableHeaderClass}>Event Name</th>
              <th className={tableHeaderClass}>Buy In</th>
              <th className={tableHeaderClass}>Entries</th>
              <th className={tableHeaderClass}>Date Event</th>
              <th className={tableHeaderClass}>Venue Event</th>
            </tr>
          </thead>
          <tbody>
            {Schedule.map((event, index) => (
              <tr key={index} className={tableRowClass}>
                <td
                  onClick={() => handleSelectDetailsEvent(event)}
                  className="border px-4 py-2 cursor-pointer underline hover:text-blue-500"
                >
                  {event.nameEvent}
                </td>
                <td className="border px-4 py-2">
                  {event.buyIn.toLocaleString()} VNĐ
                </td>
                <td className="border px-4 py-2">{event.entries}</td>
                <td className="border px-4 py-2">
                  {formatDate(event.dateEvent)}
                </td>
                <td className="border px-4 py-2">
                  {truncateText(event.venueEvent, 20)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModalUpdate && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-950 opacity-50"></div>
          <div className="bg-white w-[1024px] h-auto relative z-30 shadow-xl rounded-lg p-6">
            <div className="absolute right-6 top-6">
              <FontAwesomeIcon
                onClick={exitFormUpdate}
                className="font-bold text-4xl text-gray-400 hover:text-red-400 cursor-pointer"
                icon={faXmark}
              />
            </div>
            <div className="">
              <h1 className="text-3xl font-bold text-blue-500">
                Update Infomation Tournament
              </h1>
            </div>
            <div className="px-8 pb-4 flex gap-6 mt-8">
              <div className="flex flex-col justify-start items-center w-[50%]">
                <div className="w-full flex-col flex gap-3">
                  <InputAdmin
                    type="text"
                    value={nameTour}
                    onChange={handleNameEventChange}
                    label="Name Event"
                    // validate={(value) => /^[A-Za-z\s]+$/.test(namePlayer)}
                    placeholder="Vui lòng nhập tên ở đây"
                  />
                  <div className="">
                    <OrganizationalCheckbox
                      defaultPokerRoom={pokerRoom ? pokerRoom._id : ""}
                      defaultPokerTour={pokerTour ? pokerTour._id : ""}
                      onPokerTourChange={handlePokerTourChange}
                      onPokerRoomChange={handlePokerRoomChange}
                    />
                  </div>
                  <div className="mt-[42px] flex justify-between gap-2 items-center">
                    <div className="w-[70%]">
                      <InputAdmin
                        type="text"
                        value={
                          isChecked
                            ? selectedPokerRoom?.Adress || ""
                            : venueTour
                        }
                        onChange={handlEvenueEventtChange}
                        label="Venue Event"
                        placeholder="Vui lòng nhập ở đây"
                      />
                    </div>
                    {selectedPokerRoom !== null ? (
                      <div className="w-[30%] flex mt-6 gap-1 justify-center items-center">
                        <input
                          type="checkbox"
                          checked={isChecked} // Đảm bảo checkbox được chọn khi có selectedPokerRoom
                          onChange={handleVenueCheckboxChange}
                        />
                        <p>Adress Poker Room</p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>


                </div>
              </div>
              <div className="flex flex-col justify-start items-center w-[50%]">
                <div className="w-full flex-col flex gap-3">
                  <div className="flex justify-start gap-8 items-center">
                    <div className="w-[50%]">
                      <InputAdmin
                        type="date"
                        value={formatDateInput(dayStart)}
                        onChange={handlDateTourStartChange}
                        label="Date Tournament Start"
                        placeholder="Vui lòng nhập ở đây"
                      />
                    </div>
                    <div className="mt-6">-</div>
                    <div className="w-[50%]">
                      <InputAdmin
                        type="date"
                        value={formatDateInput(dayEnd)}
                        onChange={handlDateTourEndChange}
                        label="Date Tournament End"
                        placeholder="Vui lòng nhập ở đây"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-full items-center">
                    <div
                      className={`rounded-full overflow-hidden w-48 h-48 border-4 ${image ? "border-green-500" : "border-gray-500"
                        }`}
                    >
                      {image ? (
                        <img
                          src={image}
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
                </div>
              </div>
            </div>

            <div className="mt-10 pb-4 flex justify-center items-center w-[full] gap-6">
              <ButtonAdmin
                isFormComplete={true}
                color="blue"
                onClick={clickUpdateTournament}
              >
                Update
              </ButtonAdmin>
            </div>
          </div>
        </div>
      )}
      {/* </div> */}
    </div>
  );
};

export default AdminTournamentsDetails;

import { faChevronLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { detailsEvent } from "../../../reducers/slices/detailEventSlice";
import configRoutes from "../../../config/configRouter";
import eventApi from "../../../api/adminEventsApi";
import ButtonAdmin from "../../../components/components-admin/ButtonAdmin";
import InputAdmin from "../../../components/components-admin/InputAdmin";
import OrganizationalCheckbox from "../../../components/components-admin/OrganizationalCheckbox";
import adminTournamentsApi from "../../../api/adminTournamentsApi";
import { toast } from "react-toastify";

interface ResultPrizeItem {
  _id: string;
  playerName: string;
  place: number;
  prize: number;
}
type ResultsPrizeArray = ResultPrizeItem[];

interface EventID {
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

interface TournamentsCreat {
  _id: string;
  nameTour: string;
  dayStart: string;
  dayEnd: string;
  image: string;
  venueTour: string;
  pokerTourId: string;
  pokerRoomId: string;
}

const AdminInfoEvents = () => {
  const { id } = useParams();
  const [dataEventID, setDataEventID] = useState<EventID | null>(null);

  const navigate = useNavigate();
  // const transiData = useSelector(detailsEvent);
  // const idEvent = transiData._id;
  const [nameEvent, setNameEvent] = useState("");
  const [buyIn, setBuyIn] = useState<number>(0);
  const [dateEvent, setDateEvent] = useState("");
  const [entries, setEntries] = useState<number>(0);
  const [venueEvent, setVenueEvent] = useState("");
  const [pokerRoom, setPokerRoom] = useState<PokerRooms | null>(null);
  const [pokerTour, setPokerTour] = useState<PokerTours | null>(null);
  const resultsPrize: ResultsPrizeArray = (dataEventID?.resultsPrize ??
    []) as ResultsPrizeArray;

  const totalPrize = (entries * buyIn).toLocaleString();

  // Bây giờ bạn có thể sử dụng resultsPrizeArray như một mảng thông thường

  const tableClass = "table w-full border-collapse table-auto";
  const tableHeaderClass =
    "bg-gray-200 text-gray-600 uppercase text-sm leading-normal";
  const tableRowClass = "border bg-white hover:bg-gray-100";

  const handleSelectUpdatePlayer = (player: any) => {
    // dispatch(updateRequirePlayer(player));
    // navigate(`/admin/player-update`);
    navigate(`${configRoutes.adminUpdatePlayer}/${player._id}`);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const getRankFormat = (rank: number) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const lastTwoDigits = rank % 100;
    const lastDigit = rank % 10;

    let suffixIndex = 0;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      suffixIndex = 0;
    } else if (lastDigit === 1) {
      suffixIndex = 1;
    } else if (lastDigit === 2) {
      suffixIndex = 2;
    } else if (lastDigit === 3) {
      suffixIndex = 3;
    } else {
      suffixIndex = 0;
    }

    return `${rank}${suffixes[suffixIndex]}`;
  };

  const fetchData = async () => {
    if (typeof id === "string") {
      const res = await eventApi.getEventById(id);
      setDataEventID(res.data.event);
    } else {
      alert("Không tìm thấy ID !!!");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    if (dataEventID) {
      setNameEvent(dataEventID.nameEvent);
      setDateEvent(dataEventID.dateEvent);
      setEntries(dataEventID.entries);
      setBuyIn(dataEventID.buyIn);
      setVenueEvent(dataEventID.venueEvent);
      setPokerRoom(dataEventID.pokerRoom);
      setPokerTour(dataEventID.pokerTour);
    }
  }, [dataEventID]);

  const clickShowUpdate = () => {
    setShowModalUpdate(true);
  };

  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("en-GB");
  };

  //Input Update
  const [selectedTournaments, setSelectedTournaments] =
    useState<TournamentsCreat | null>(null);
  const [dataTournaments, setDataTournaments] = useState<TournamentsCreat[]>(
    []
  );
  const [selectedPokerTour, setSelectedPokerTour] = useState<PokerTours | null>(
    pokerTour
  );
  const [selectedPokerRoom, setSelectedPokerRoom] = useState<PokerRooms | null>(
    pokerRoom
  );

  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showVeRoomTour, setShowVeRoomTour] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isFormCompleteEventTour, setIsFormCompleteEventTour] = useState(true);

  useEffect(() => {
    if (
      nameEvent !== "" &&
      buyIn !== 0 &&
      venueEvent !== "" &&
      dateEvent !== "" &&
      entries !== 0
    ) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [nameEvent, buyIn, venueEvent, dateEvent, entries]);

  const handleNameEventChange = (value: string | number) => {
    setNameEvent(String(value));
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
      setVenueEvent(String(value));
    }
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
  const handleTournamentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const tournamentId = event.target.value;
    const tournament =
      dataTournaments.find((p) => p._id === tournamentId) || null;
    setSelectedTournaments(tournament);
  };
  const handlDateEventChange = (value: string | number) => {
    setDateEvent(String(value));
  };

  const handleBuyInChange = (value: string | number) => {
    setBuyIn(Number(value));
  };
  const handleEntriesChange = (value: string | number) => {
    setEntries(Number(value));
  };
  const formatDateInput = (dateString: string) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = `${dateObj.getMonth() + 1}`.padStart(2, "0");
    const day = `${dateObj.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  //Các Sự kiện click modal update
  const exitFormUpdate = () => {
    if (dataEventID) {
      const initialTournament = dataTournaments.find(
        (tournament) => tournament._id === dataEventID.tourementID
      );
      setSelectedTournaments(initialTournament || null);
    }
    setShowModalUpdate(false);
    fetchData();
  };

  const clickUpdateEvents = async () => {
    const dataCreateEventSingle: Object = {
      nameEvent: nameEvent,
      buyIn: buyIn,
      venueEvent: venueEvent,
      dateEvent: dateEvent,
      entries: entries,
      pokerTourId: selectedPokerTour ? selectedPokerTour._id : undefined,
      pokerRoomId: selectedPokerRoom ? selectedPokerRoom._id : undefined,
    };
    const dataCreateEventOfTour: Object = {
      nameEvent: nameEvent,
      buyIn: buyIn,
      venueEvent: selectedTournaments?.venueTour,
      dateEvent: dateEvent,
      entries: entries,
      pokerTourId: selectedTournaments
        ? selectedTournaments.pokerTourId
        : undefined,
      pokerRoomId: selectedTournaments
        ? selectedTournaments.pokerRoomId
        : undefined,
      tourementID: selectedTournaments ? selectedTournaments._id : undefined,
    };
    if (dataEventID?.tourementID) {
      try {
        const response = await eventApi.updateEvent(
          id ? id : "",
          dataCreateEventOfTour
        );
        toast.success("Cập nhật thông tin Event của Tournament thành công");
        fetchData();
        setShowModalUpdate(false);
      } catch (error) {
        console.log("Thất bại", error);
        toast.error("Cập nhật Event của Tournament thất bại");
      }
    } else {
      try {
        const response = await eventApi.updateEvent(
          id ? id : "",
          dataCreateEventSingle
        );
        toast.success("Cập nhật thông tin Event đơn thành công");
        fetchData();
        setShowModalUpdate(false);
      } catch (error) {
        console.log("Thất bại", error);
        toast.error("Cập nhật thông tin Event thất bại!!!");
      }
    }
  };

  const fetchDataTours = async () => {
    try {
      const res = await adminTournamentsApi.getAllTournaments();
      setDataTournaments(res.data.data);
    } catch (error) {
      console.log("Error fetching tournaments data:", error);
    }
  };

  useEffect(() => {
    fetchDataTours();
  }, []);

  useEffect(() => {
    // Kiểm tra nếu dataEventID và dataTournaments đã được lấy và selectedTournaments chưa được gán
    if (dataEventID && dataTournaments.length > 0 && !selectedTournaments) {
      // Tìm giải đấu có _id trùng với dataEventID.tourementID
      const initialTournament = dataTournaments.find(
        (tournament) => tournament._id === dataEventID.tourementID
      );
      // Gán giá trị ban đầu cho selectedTournaments
      setSelectedTournaments(initialTournament || null);
    }
  }, [dataEventID, dataTournaments, selectedTournaments]);

  return (
    <div className="">
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
      <h1 className="text-4xl font-bold text-center">Event Details</h1>
      <div className="w-full mt-10 flex flex-col gap-4 bg-white rounded-xl shadow-xl px-6 py-4">
        <div className="flex justify-start items-center">
          <h3 className="w-[30%] font-bold text-left text-xl">ID Event : </h3>
          <p className="text-xl text-blue-500 font-bold w-[70%] text-right">
            {id}
          </p>
        </div>
        <div className="flex justify-start items-center">
          <h3 className="w-[30%] font-bold text-left text-xl">
            Name Event :{" "}
          </h3>
          <p className="text-xl text-red-500 font-bold w-[70%] text-right">
            {nameEvent}
          </p>
        </div>
        <div className="flex justify-start items-center">
          <h3 className="w-[30%] font-bold text-left text-xl">Buy In : </h3>
          <p className="text-xl text-green-500 font-bold w-[70%] text-right">
            {buyIn.toLocaleString()} VNĐ
          </p>
        </div>
        <div className="flex justify-start items-center">
          <h3 className="w-[30%] font-bold text-left text-xl">
            Date Event :{" "}
          </h3>
          <p className="text-xl text-yellow-500 font-bold w-[70%] text-right">
            {formatDate(dateEvent)}
          </p>
        </div>
        <div className="flex justify-start items-center">
          <h3 className="w-[30%] font-bold text-left text-xl">Entries : </h3>
          <p className="text-xl text-violet-500 font-bold w-[70%] text-right">
            {entries}
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
        <div className="flex justify-start items-center pb-2 border-b-[1px] border-gray-400">
          <h3 className="w-[30%] font-bold text-left text-xl">
            Venue Event :{" "}
          </h3>
          <p className="text-xl text-black font-bold w-[70%] text-right">
            {venueEvent}
          </p>
        </div>

        <div className="flex justify-start items-center">
          <h3 className="w-[30%] font-bold text-blue-400  text-left text-xl">
            Total Prize :
          </h3>
          <p className="text-xl font-bold w-[70%] text-blue-400 text-right">
            {totalPrize} VNĐ
          </p>
        </div>

        <div className="flex justify-center items-center ">
          <ButtonAdmin
            isFormComplete={true}
            color="blue"
            onClick={clickShowUpdate}
          >
            Update Infomation Event
          </ButtonAdmin>
        </div>
      </div>
      <div className="p-2 w-full mt-10 bg-white rounded-xl shadow-xl">
        <div className="mb-4 text-left">
          <h2 className="text-xl font-bold text-teal-500">
            Competition Results
          </h2>
        </div>
        <table className={`${tableClass} h-full`}>
          <thead>
            <tr>
              <th className={tableHeaderClass}>Player Name</th>
              <th className={tableHeaderClass}>Rank</th>
              <th className={tableHeaderClass}>Prize</th>
            </tr>
          </thead>
          <tbody>
            {resultsPrize.map((event, index) => (
              <tr key={index} className={tableRowClass}>
                <td
                  onClick={() => handleSelectUpdatePlayer(event)}
                  className="border px-4 py-2 cursor-pointer underline hover:text-blue-500"
                >
                  {event.playerName}
                </td>
                <td className="border px-4 py-2">
                  {getRankFormat(event.place)}
                </td>
                <td className="border px-4 py-2">
                  {event.prize.toLocaleString()}VNĐ
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
                Update Infomation Event
              </h1>
            </div>
            <div className="px-8 pb-4 flex gap-6 mt-4">
              <div className="flex flex-col justify-center items-center w-[50%]">
                <div className="w-full flex-col flex gap-3">
                  <InputAdmin
                    type="text"
                    value={nameEvent}
                    onChange={handleNameEventChange}
                    label="Name Event"
                    // validate={(value) => /^[A-Za-z\s]+$/.test(namePlayer)}
                    placeholder="Vui lòng nhập tên ở đây"
                  />
                  {!dataEventID?.tourementID && (
                    <div className="">
                      <OrganizationalCheckbox
                        defaultPokerRoom={pokerRoom ? pokerRoom._id : ""}
                        defaultPokerTour={pokerTour ? pokerTour._id : ""}
                        onPokerTourChange={handlePokerTourChange}
                        onPokerRoomChange={handlePokerRoomChange}
                      />
                    </div>
                  )}
                  {!dataEventID?.tourementID && (
                    <div className="mt-[42px] flex justify-between gap-2 items-center">
                      <div className="w-[70%]">
                        <InputAdmin
                          type="text"
                          value={
                            isChecked
                              ? selectedPokerRoom?.Adress || ""
                              : venueEvent
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
                  )}
                  {dataEventID?.tourementID && (
                    <div className="flex flex-col w-full">
                      <label
                        className="text-left font-bold"
                        htmlFor="player-select"
                      >
                        Select Tournament:
                      </label>
                      <select
                        id="player-select"
                        className="border p-1 rounded-xl border-gray-400"
                        value={
                          selectedTournaments ? selectedTournaments._id : ""
                        }
                        onChange={handleTournamentChange}
                      >
                        <option value="">Select a Tournament</option>
                        {dataTournaments.map((tourItem) => (
                          <option key={tourItem._id} value={tourItem._id}>
                            {tourItem.nameTour}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {/* <div
                                        onClick={() => setShowAddPlayers(true)}
                                        className="flex w-[30%] mt-6 gap-2 cursor-pointer justify-center items-center px-2 py-1 rounded-xl border-gray-400 border-[1px] hover:bg-blue-500 hover:text-white transition-colors ease-in-out duration-200"
                                    >
                                        <FontAwesomeIcon
                                            className="text-green-400"
                                            icon={faPlusCircle}
                                        />
                                        <button>Add Players</button>
                                    </div> */}
                </div>
              </div>
              <div className="flex flex-col justify-start items-center w-[50%]">
                <div className="w-full flex-col flex gap-3">
                  <InputAdmin
                    type="date"
                    value={formatDateInput(dateEvent)}
                    onChange={handlDateEventChange}
                    label="Date Event"
                    placeholder="Vui lòng nhập ở đây"
                  />
                  <InputAdmin
                    type="number"
                    value={buyIn}
                    onChange={handleBuyInChange}
                    label="Buy In"
                    // validate={(value) => /^[A-Za-z\s]+$/.test(namePlayer)}
                    placeholder="Vui lòng nhập ở đây"
                  />
                  <InputAdmin
                    type="number"
                    value={entries}
                    onChange={handleEntriesChange}
                    label="Entries"
                    // validate={(value) => /^[A-Za-z\s]+$/.test(namePlayer)}
                    placeholder="Vui lòng nhập ở đây"
                  />
                </div>
              </div>
            </div>
            {dataEventID?.tourementID !== undefined ? (
              <div className="mt-10 pb-4 flex justify-center items-center w-[full] gap-6">
                <ButtonAdmin
                  isFormComplete={isFormCompleteEventTour}
                  color="blue"
                  onClick={clickUpdateEvents}
                >
                  Update Infomation Event For Tournament
                </ButtonAdmin>
              </div>
            ) : (
              <div className="mt-10 pb-4 flex justify-center items-center w-[full] gap-6">
                <ButtonAdmin
                  isFormComplete={isFormComplete}
                  color="blue"
                  onClick={clickUpdateEvents}
                >
                  Update Infomation Event
                </ButtonAdmin>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInfoEvents;

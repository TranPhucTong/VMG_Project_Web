import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputAdmin from '../../../components/components-admin/InputAdmin';
import playerApi from '../../../api/playerApi';
import { faEdit, faEllipsis, faPlusCircle, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import ButtonAdmin from '../../../components/components-admin/ButtonAdmin';
import eventApi from '../../../api/adminEventsApi';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { requireDetailsEvent } from '../../../reducers/slices/detailEventSlice';



interface TableRow {
  _id: string;
  playerName: string;
  linkInfo: string;
  avatarImage: string;
  totalWinnings: number;
  vpoyPoint: number;
  country: string;
  city: string;
  historyEvent: [];
  rank: number;
}


interface EventRow {
  _id: string;
  nameEvent: string;
  buyIn: number;
  dateEvent: string;
  entries: number;
  resultsPrize: [];
}

const AdminEvents = () => {
  const [nameEvent, setNameEvent] = useState("");
  const [venueEvent, setVenueEvent] = useState("");
  const [dateEvent, setDateEvent] = useState("")
  const [resultsPrize, setResultsPrize] = useState([]);
  const [entries, setEntries] = useState<string | number>("");
  const [buyIn, setBuyIn] = useState<string | number>("");



  const [selectedPlayer, setSelectedPlayer] = useState<TableRow | null>(null);
  const [place, setPlace] = useState<string | number>("");
  const [prize, setPrize] = useState<string | number>("");

  const [showAddPlayers, setShowAddPlayers] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isSave, setIsSave] = useState(false);

  const [dataPlayer, setDataPlayer] = useState<TableRow[]>([]);
  const [dataEvent, setDataEvent] = useState<EventRow[]>([]);


  const [newArray, setNewArray] = useState<{
    _id: string;
    playerName: string;
    place: number;
    prize: number;
  }[]>([]);

  const fetchData = async () => {
    const res = await playerApi.getPlayer();
    const resEvent = await eventApi.getEvent();
    setDataPlayer(res.data.players);
    setDataEvent(resEvent.data.eventPorkers);
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
  }, [dataPlayer]);

  useEffect(() => {
    if (nameEvent !== "" && buyIn !== "" && venueEvent !== "" && dateEvent !== "" && entries !== "" && newArray.length !== 0) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }

    if (newArray.length !== 0) {
      setIsSave(true);
    }

  }, [nameEvent, buyIn, venueEvent, venueEvent, dateEvent, entries, newArray, selectedPlayer]);


  const handleNameEventChange = (value: string | number) => {
    setNameEvent(String(value));
  };
  const handlEvenueEventtChange = (value: string | number) => {
    setVenueEvent(String(value));
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




  const tableClass = "table w-full border-collapse table-auto";
  const tableHeaderClass = "bg-gray-200 text-gray-600 uppercase text-sm leading-normal";
  const tableRowClass = "border bg-white hover:bg-gray-100";

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const menuRef = useRef<HTMLDivElement>(null);

  const handlePlayerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const playerId = event.target.value;
    const player = dataPlayer.find((p) => p._id === playerId) || null;
    setSelectedPlayer(player);
  };

  const handlePlaceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlace(event.target.value);
  };

  const handlePrizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrize(event.target.value);
  };

  const handleAddPlayer = () => {
    if (selectedPlayer && place && prize) {
      setNewArray((prevArray) => [
        ...prevArray,
        {
          _id: selectedPlayer._id,
          playerName: selectedPlayer.playerName,
          place: Number(place),
          prize: Number(prize),
        },
      ]);
      setSelectedPlayer(null);
      setPlace("");
      setPrize("");
    }
  };

  const sortedArray = [...newArray].sort((a, b) => a.place - b.place);
  const defauthValue = () => {
    setNameEvent("");
    setBuyIn("");
    setEntries("");
    setDateEvent("");
    setVenueEvent("");
    setNewArray([]);
  }
  const clickAddEvent = async () => {
    const dataCreate: Object = {
      nameEvent: nameEvent,
      buyIn: buyIn,
      venueEvent: venueEvent,
      dateEvent: dateEvent,
      entries: entries,
      resultsPrize: newArray
    };

    try {
      const response = await eventApi.createEvent(dataCreate);
      console.log("Thành công", response);
      toast.success("Thêm event mới thành công");
      defauthValue();
    } catch (error) {
      console.log("Thất bại", error);
      toast.error("Trùng tên event hoặc chưa nhập đầy đủ thông tin. Vui lòng kiểm tra lại!!!")
    }
  };

  const totalPages: number = Math.ceil(dataEvent.length / rowsPerPage);
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
  const currentRows: EventRow[] = dataEvent.slice(startIndex, endIndex);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const handleMenuToggle = (rowIndex: number) => {
    setSelectedRow(selectedRow === rowIndex ? null : rowIndex);
  };

  let totalPlayer = 0;

  const demMang = () => {
    for (var i = 0; i < dataEvent.length; i++) {
      totalPlayer = i + 1;
    }
  };
  demMang();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSelectDetailsEvent = (event: any) => {
    dispatch(requireDetailsEvent(event));
    navigate("/admin/events-details");
  };

  return (
    <div>
      <div className="flex justify-between gap-8 items-center">
        <div className="flex gap-8 justify-center items-center">
          <h1 className="text-3xl font-medium text-left tracking-wide">
            Events
          </h1>
          <p className="font-normal tracking-wide flex gap-1 justify-center items-center text-sm">
            Quantity:{" "}
            <span className="text-blue-400 font-bold">{totalPlayer}</span>
          </p>
        </div>
      </div>
      <div className="mt-5 rounded-lg bg-white shadow-xl">
        <div className='px-8 py-4 text-left'>
          <h1 className='text-2xl font-bold text-left'>Create New Event</h1>
        </div>
        <div className='px-8 pb-4 flex gap-6'>
          <div className='flex flex-col justify-center items-center w-[50%]'>
            <div className='w-full flex-col flex gap-3'>
              <InputAdmin
                type="text"
                value={nameEvent}
                onChange={handleNameEventChange}
                label="Name Event"
                // validate={(value) => /^[A-Za-z\s]+$/.test(namePlayer)}
                placeholder="Vui lòng nhập tên ở đây"
              />
              <InputAdmin
                type="text"
                value={venueEvent}
                onChange={handlEvenueEventtChange}
                label="Venue Event"
                placeholder="Vui lòng nhập ở đây"
              />
              <InputAdmin
                type="date"
                value={dateEvent}
                onChange={handlDateEventChange}
                label="Date Event"
                placeholder="Vui lòng nhập ở đây"
              />
            </div>

          </div>
          <div className='flex flex-col justify-start items-center w-[50%]'>
            <div className='w-full flex-col flex gap-3'>
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
              <div
                onClick={() => setShowAddPlayers(true)}
                className="flex w-[30%] mt-7 gap-2 cursor-pointer justify-center items-center px-2 py-1 rounded-xl border-gray-400 border-[1px] hover:bg-blue-500 hover:text-white transition-colors ease-in-out duration-200"
              >
                <FontAwesomeIcon
                  className="text-green-400"
                  icon={faPlusCircle}
                />
                <button>Add Players</button>
              </div>
            </div>
          </div>

        </div>
        <div className='mt-10 pb-4 flex justify-center items-center w-[full] gap-6'>
          <ButtonAdmin isFormComplete={isFormComplete} color="blue" onClick={clickAddEvent} >
            Add New Event
          </ButtonAdmin>
        </div>


      </div>
      <div className="mt-5 rounded-lg bg-white shadow-xl">
        <div className='px-8 py-4 text-left'>
          <h1 className='text-2xl font-bold text-left'>List Events</h1>
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
                  Event Name
                </th>
                <th className="px-[16px] py-[20px] text-center min-w-[80px]">
                  Buy In
                </th>
                <th className="px-[16px] py-[20px] text-center min-w-[80px]">
                  Date Event
                </th>
                <th className="px-[16px] py-[20px] text-center min-w-[80px]">
                  Entries
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
                  <td onClick={() => handleSelectDetailsEvent(row)} className="px-[16px] flex justify-center items-center gap-2 py-[20px] text-center min-w-[80px] underline cursor-pointer hover:text-blue-500 font-medium transition-all duration-100 ease-in-out">
                    {row.nameEvent}
                  </td>
                  <td className="px-[16px] py-[20px] text-center min-w-[80px]">
                    {row.buyIn}
                  </td>
                  <td className="px-[16px] py-[20px] text-center min-w-[80px]">
                    {row.dateEvent}
                  </td>
                  <td className="px-[16px] py-[20px] text-center min-w-[80px]">
                    {row.entries}
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

                          >
                            <FontAwesomeIcon
                              className="text-xl"
                              icon={faEdit}
                            />
                            <p className="font-bold">Edit</p>
                          </button>
                          <button
                            className="flex gap-3 justify-center hover:text-[#f45d5d] items-center w-full text-left px-4 py-2 text-red-600 "
                          // onClick={() => handleDelete(row)}
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


      {showAddPlayers && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-950 opacity-50"></div>
          <div className="bg-white w-[800px] h-auto relative z-30 shadow-xl rounded-lg p-6">
            <div className="absolute right-6 top-6">
              <FontAwesomeIcon
                onClick={() => setShowAddPlayers(false)}
                className="font-bold text-4xl text-gray-400 hover:text-red-400 cursor-pointer"
                icon={faXmark}
              />
            </div>
            <div className="">
              <h1 className="text-3xl uppercase font-bold text-blue-500">
                Add Players To Event
              </h1>
            </div>

            <div className='flex flex-col gap-6 w-full justify-center items-center mt-4'>
              {/* Hiển thị danh sách người chơi */}
              <div className='flex flex-col w-[50%]'>
                <label className='text-left font-bold' htmlFor="player-select">Select Player:</label>
                <select
                  id="player-select"
                  className="border p-1"
                  value={selectedPlayer ? selectedPlayer._id : ""}
                  onChange={handlePlayerChange}
                >
                  <option value="">Select a player</option>
                  {dataPlayer.map((player) => (
                    <option key={player._id} value={player._id}>
                      <span className='font-bold'> {player.playerName}</span>
                      <span>({player.country})</span>
                    </option>
                  ))}
                </select>
              </div>

              {/* Form nhập thông tin người chơi */}

              <div className='flex gap-3'>
                <label className='font-bold' htmlFor="place-input">Place:</label>
                <input
                  className='border p-1'
                  type="number"
                  id="place-input"
                  value={place}
                  onChange={handlePlaceChange}
                />
              </div>

              <div className='flex gap-3'>
                <label className='font-bold' htmlFor="prize-input">Prize:</label>
                <input
                  type="number"
                  className='border p-1'
                  id="prize-input"
                  value={prize}
                  onChange={handlePrizeChange}
                />
              </div>

              <div className='flex justify-center items-center gap-4 w-full'>
                <button className='px-4 py-2 rounded-xl bg-blue-500 text-white hover:opacity-90' onClick={handleAddPlayer}>Add To List</button>
                <button className={`px-4 py-2 rounded-xl bg-green-500 text-white hover:opacity-90 ${isSave ? "" : "opacity-50 pointer-events-none disabled"}`} onClick={() => setShowAddPlayers(false)}>Save</button>
              </div>


              {/* Hiển thị thông tin của newArray */}
              <div className="overflow-y-scroll w-full" style={{ maxHeight: '300px' }}>
                <table className={tableClass}>
                  <thead>
                    <tr>
                      <th className={tableHeaderClass}>ID</th>
                      <th className={tableHeaderClass}>Player Name</th>
                      <th className={tableHeaderClass}>Place</th>
                      <th className={tableHeaderClass}>Prize</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedArray.map((player, index) => (
                      <tr key={index} className={tableRowClass}>
                        <td className="border px-4 py-2">{player._id}</td>
                        <td className="border px-4 py-2">{player.playerName}</td>
                        <td className="border px-4 py-2">{player.place}</td>
                        <td className="border px-4 py-2">{player.prize}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminEvents

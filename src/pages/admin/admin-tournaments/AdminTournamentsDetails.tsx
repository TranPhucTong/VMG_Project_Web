import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import adminTournamentsApi from "../../../api/adminTournamentsApi";
import axios from "axios";
import configRoutes from "../../../config/configRouter";

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
      <div className="w-full flex justify-center gap-2 items-start mt-8">
        <div className="w-[50%] flex flex-col gap-4 bg-white rounded-xl shadow-xl px-6 py-4">
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
        </div>
        <div className="p-2 w-[50%] bg-white rounded-xl shadow-xl">
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
      </div>
    </div>
  );
};

export default AdminTournamentsDetails;

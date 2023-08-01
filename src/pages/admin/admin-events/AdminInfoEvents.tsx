import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { detailsEvent } from '../../../reducers/slices/detailEventSlice';
import configRoutes from '../../../config/configRouter'
import eventApi from '../../../api/adminEventsApi'


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
    pokerRoom: PokerRooms;
    pokerTour: PokerTours;
    resultsPrize: []
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
    const resultsPrize: ResultsPrizeArray = (dataEventID?.resultsPrize ?? []) as ResultsPrizeArray;



    const totalPrize = (entries * buyIn).toLocaleString();

    // Bây giờ bạn có thể sử dụng resultsPrizeArray như một mảng thông thường

    const tableClass = "table w-full border-collapse table-auto";
    const tableHeaderClass = "bg-gray-200 text-gray-600 uppercase text-sm leading-normal";
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
        if (typeof id === 'string') {
            const res = await eventApi.getEventById(id);
            setDataEventID(res.data.event);
        } else {
            alert("Không tìm thấy ID !!!")
        }
    }
    
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
            <div className='w-full flex justify-center gap-2 items-start mt-8'>
                <div className='w-[50%] flex flex-col gap-4 bg-white rounded-xl shadow-xl px-6 py-4'>
                    <div className='flex justify-start items-center'>
                        <h3 className='w-[30%] font-bold text-left text-xl'>ID Event : </h3>
                        <p className='text-xl text-blue-500 font-bold w-[70%] text-right'>{id}</p>
                    </div>
                    <div className='flex justify-start items-center'>
                        <h3 className='w-[30%] font-bold text-left text-xl'>Name Event : </h3>
                        <p className='text-xl text-red-500 font-bold w-[70%] text-right'>{nameEvent}</p>
                    </div>
                    <div className='flex justify-start items-center'>
                        <h3 className='w-[30%] font-bold text-left text-xl'>Buy In : </h3>
                        <p className='text-xl text-green-500 font-bold w-[70%] text-right'>{buyIn} $</p>
                    </div>
                    <div className='flex justify-start items-center'>
                        <h3 className='w-[30%] font-bold text-left text-xl'>Date Event : </h3>
                        <p className='text-xl text-yellow-500 font-bold w-[70%] text-right'>{dateEvent}</p>
                    </div>
                    <div className='flex justify-start items-center'>
                        <h3 className='w-[30%] font-bold text-left text-xl'>Entries : </h3>
                        <p className='text-xl text-violet-500 font-bold w-[70%] text-right'>{entries}</p>
                    </div>
                    <div className='flex justify-start items-center'>
                        <h3 className='w-[30%] font-bold text-left text-xl'>Organizational Units : </h3>
                        <div className='flex flex-col justify-center items-end w-[70%]'>
                            <p className='text-xl text-black font-bold  text-right'>{pokerTour?.name} <span className='text-green-600'>( {pokerTour?.shortName} )</span> </p>
                            <p className='text-xl text-black font-bold text-right'>{pokerRoom?.name} <span className='text-green-600'>( {pokerRoom?.shortName} )</span> </p>
                        </div>
                    </div>
                    <div className='flex justify-start items-center pb-2 border-b-[1px] border-gray-400'>
                        <h3 className='w-[30%] font-bold text-left text-xl'>Venue Event : </h3>
                        <p className='text-xl text-black font-bold w-[70%] text-right'>{venueEvent}</p>
                    </div>

                    <div className='flex justify-start items-center'>
                        <h3 className='w-[30%] font-bold text-blue-400  text-left text-xl'>
                            Total Prize :</h3>
                        <p className='text-xl font-bold w-[70%] text-blue-400 text-right'>{totalPrize}$</p>
                    </div>

                </div>
                <div className="p-2 w-[50%] bg-white rounded-xl shadow-xl">
                    <div className='mb-4 text-left'>
                        <h2 className='text-xl font-bold text-teal-500'>
                            Competition Results</h2>
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
                                    <td onClick={() => handleSelectUpdatePlayer(event)} className="border px-4 py-2 cursor-pointer underline hover:text-blue-500">{event.playerName}</td>
                                    <td className="border px-4 py-2">{getRankFormat(event.place)}</td>
                                    <td className="border px-4 py-2">{(event.prize).toLocaleString()}$</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminInfoEvents

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { detailsEvent } from '../../../reducers/slices/detailEventSlice';


interface ResultPrizeItem {
    _id: string;
    playerName: string;
    place: number;
    prize: number;
}
type ResultsPrizeArray = ResultPrizeItem[];

const AdminInfoEvents = () => {
    const navigate = useNavigate();
    const transiData = useSelector(detailsEvent);
    const idEvent = transiData._id;
    const nameEvent = transiData.nameEvent;
    const buyIn = transiData.buyIn;
    const dateEvent = transiData.dateEvent;
    const entries = transiData.entries;
    const resultsPrize: ResultsPrizeArray = Object.values(
        transiData.resultsPrize
    ) as ResultsPrizeArray; // Sử dụng 'as ResultsPrizeArray' để khai báo kiểu cho kết quả

    // Bây giờ bạn có thể sử dụng resultsPrizeArray như một mảng thông thường
    console.log(resultsPrize);

    const tableClass = "table w-full border-collapse table-auto";
    const tableHeaderClass = "bg-gray-200 text-gray-600 uppercase text-sm leading-normal";
    const tableRowClass = "border bg-white hover:bg-gray-100";
    return (
        <div className="">
            <div className="flex flex-col gap-1">
                <div
                    onClick={() => navigate("/admin/events")}
                    className={`flex text-base text-gray-500 font-medium gap-2 items-center cursor-pointer hover:-translate-x-1 transform transition-transform 
          `}
                >
                    <FontAwesomeIcon className="font-extrabold" icon={faChevronLeft} />
                    <h2>Back</h2>
                </div>
            </div>
            <h1 className="text-4xl font-bold text-center">Event Details</h1>
            <div className='w-full flex justify-center gap-2 items-start mt-8'>
                <div className='w-[30%] flex flex-col gap-4 bg-white rounded-xl shadow-xl px-6 py-4'>
                    <div className='flex justify-start items-center'>
                        <h3 className='w-[30%] font-bold text-left text-xl'>ID Event : </h3>
                        <p className='text-xl text-blue-500 font-bold w-[70%] text-right'>{idEvent}</p>
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

                </div>
                <div className="p-2 w-[70%] bg-white rounded-xl shadow-xl">
                    <div className='mb-4 text-left'>
                        <h2 className='text-xl font-bold'>Rank Player In Event</h2>
                    </div>
                    <table className={`${tableClass} h-full`}>
                        <thead>
                            <tr>
                                <th className={tableHeaderClass}>ID</th>
                                <th className={tableHeaderClass}>Player Name</th>
                                <th className={tableHeaderClass}>Place</th>
                                <th className={tableHeaderClass}>Prize</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultsPrize.map((event, index) => (
                                <tr key={index} className={tableRowClass}>
                                    <td className="border px-4 py-2">{event._id}</td>
                                    <td className="border px-4 py-2">{event.playerName}</td>
                                    <td className="border px-4 py-2">{event.place}</td>
                                    <td className="border px-4 py-2">{event.prize}</td>
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

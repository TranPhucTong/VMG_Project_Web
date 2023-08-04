import React, { useEffect, useState } from 'react'
import pokerTourApi from '../../api/adminPokerTourApi';
import pokerRoomApi from '../../api/adminPokerRoomApi';

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

type PokerTourChangeHandler = (tour: PokerTours | null) => void;
type PokerRoomChangeHandler = (room: PokerRooms | null) => void;

const OrganizationalCheckbox = ({ onPokerTourChange,
    onPokerRoomChange, defaultPokerTour,
    defaultPokerRoom,
}: {
    onPokerTourChange: PokerTourChangeHandler;
    onPokerRoomChange: PokerRoomChangeHandler;
    defaultPokerTour: string | null;
    defaultPokerRoom: string | null;
}) => {
    const [showPokerRoom, setShowPokerRoom] = useState(false);
    const [showPokerTour, setShowPokerTour] = useState(false);
    const [showBoth, setBoth] = useState(true);
    const [selectedRoom, setSelectedRoom] = useState<string | null>(defaultPokerRoom);
    const [selectedTour, setSelectedTour] = useState<string | null>(defaultPokerTour);





    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value === "both") {
            setBoth(true)
            setShowPokerRoom(false);
            setShowPokerTour(false);
        } else if (value === "poker-room") {
            setShowPokerRoom(true);
            setShowPokerTour(false);
            setBoth(false);
        } else if (value === "poker-tour") {
            setShowPokerRoom(false);
            setShowPokerTour(true);
            setBoth(false)
        }
    };


    useEffect(() => {
        onPokerRoomChange(null);
        onPokerTourChange(null);
    }, [showPokerRoom, showPokerTour, showBoth]);


    const handlePokerTourChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const tourId = event.target.value;
        setSelectedTour(tourId);
        const tour = dataPokerTour.find((pokerTour) => pokerTour._id === tourId) || null;
        onPokerTourChange(tour);
    };

    const handlePokerRoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const roomId = event.target.value;
        setSelectedRoom(roomId);
        const room = dataPokerRoom.find((pokerRoom) => pokerRoom._id === roomId) || null;
        onPokerRoomChange(room);
    };

    const [dataPokerTour, setDataPokerTour] = useState<PokerTours[]>([]);
    const [dataPokerRoom, setDataPokerRoom] = useState<PokerRooms[]>([]);

    const fetchDataTour = async () => {
        const resTour = await pokerTourApi.getPokerTour();
        setDataPokerTour(resTour.data.data);
    };

    const fetchDataRoom = async () => {
        const resRoom = await pokerRoomApi.getPokerRoom();
        setDataPokerRoom(resRoom.data.data);
    }

    useEffect(() => {
        fetchDataTour();
        fetchDataRoom();
    }, [])

    return (
        <div>
            <div className='flex justify-start items-center'>
                {showPokerRoom && (
                    <div className="mb-4 w-full">
                        <label className="block text-lg text-left font-medium text-gray-700">
                            Select Poker Room:
                        </label>
                        <select onChange={handlePokerRoomChange}
                            value={selectedRoom ? selectedRoom : ""}
                            className="block w-full px-4 py-1 border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none" >
                            <option value="">Select a poker room</option>
                            {dataPokerRoom.map((pokerRoom, index) => (
                                <option key={index} value={pokerRoom._id}>
                                    {pokerRoom.name} - ({pokerRoom.shortName})
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                {showPokerTour && (
                    <div className="mb-4 w-full">
                        <label className="block text-lg font-medium text-left text-gray-700">
                            Select Poker Tour:
                        </label>
                        <select
                            value={selectedTour ? selectedTour : ""}
                            onChange={handlePokerTourChange} className="block w-full px-4 py-1 border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none" >
                            <option value="">Select a poker tour</option>
                            {dataPokerTour.map((pokerTour, index) => (
                                <option key={index} value={pokerTour._id}>
                                    {pokerTour.name} - ({pokerTour.shortName})
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>


            {showBoth && (
                <div className='flex justify-between gap-2 items-center'>
                    <div className="mb-4 w-[50%]">
                        <label className="block text-lg text-left font-medium text-gray-700">
                            Select Poker Tour:
                        </label>
                        <select
                            className="block w-full px-4 py-1 border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                            onChange={handlePokerTourChange}
                            value={selectedTour ? selectedTour : ""}
                        >
                            <option value="">Select a poker tour</option>
                            {dataPokerTour.map((pokerTour) => (
                                <option key={pokerTour._id} value={pokerTour._id}>
                                    {pokerTour.name} - ({pokerTour.shortName})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4 w-[50%]">
                        <label className="block text-lg text-left font-medium text-gray-700">
                            Select Poker Room:
                        </label>
                        <select
                            className="block w-full  px-4 py-1 border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                            onChange={handlePokerRoomChange}
                            value={selectedRoom ? selectedRoom : ""}
                        >
                            <option value="">Select a poker room</option>
                            {dataPokerRoom.map((pokerRoom) => (
                                <option key={pokerRoom._id} value={pokerRoom._id}>
                                    {pokerRoom.name} - ({pokerRoom.shortName})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>


            )}
            <div className='flex justify-center items-center gap-3'>
                <div>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            value="poker-tour"
                            onChange={handleRadioChange}
                            checked={showPokerTour}
                            className="form-radio h-5 w-5 text-blue-500"
                        />
                        <span className="text-lg font-medium text-gray-700">Poker Tour</span>
                    </label>
                </div>
                <div>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            value="poker-room"
                            onChange={handleRadioChange}
                            checked={showPokerRoom}
                            className="form-radio h-5 w-5 text-blue-500"
                        />
                        <span className="text-lg font-medium text-gray-700">Poker Room</span>
                    </label>
                </div>

                <div>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            value="both"
                            onChange={handleRadioChange}
                            checked={showBoth}
                            className="form-radio h-5 w-5 text-blue-500"
                        />
                        <span className="text-lg font-medium text-gray-700">Both</span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default OrganizationalCheckbox

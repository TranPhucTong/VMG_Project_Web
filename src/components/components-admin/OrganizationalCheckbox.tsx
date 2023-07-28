import React, { useState } from 'react'

interface CheckboxSelectProps {
    onPokerRoomSelectChange: (selectedValue: string) => void;
    onPokerTourSelectChange: (selectedValue: string) => void;
  }

const OrganizationalCheckbox :  React.FC<CheckboxSelectProps> = ({
    onPokerRoomSelectChange,
    onPokerTourSelectChange,
  }) => {
    const [showPokerRoom, setShowPokerRoom] = useState(false);
    const [showPokerTour, setShowPokerTour] = useState(true);
    const [showBoth, setBoth] = useState(false);

    const [selectedPokerRoom, setSelectedPokerRoom] = useState("");
    const [selectedPokerTour, setSelectedPokerTour] = useState("");

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value === "both") {
            setBoth(true)
            setShowPokerRoom(false);
            setShowPokerTour(false);
        } else if (value === "poker-room") {
            setShowPokerRoom(true);
            setShowPokerTour(false);
            setBoth(false)
        } else if (value === "poker-tour") {
            setShowPokerRoom(false);
            setShowPokerTour(true);
            setBoth(false)
        }
    };

    // Dữ liệu cho Poker Room
    const pokerRoomsData = [
        {
            name: "Poker Room 1",
            address: "Địa chỉ Poker Room 1",
            logo: "link-logo-1.png",
        },
        {
            name: "Poker Room 2",
            address: "Địa chỉ Poker Room 2",
            logo: "link-logo-2.png",
        },
        // Thêm các đối tượng poker room khác (nếu có)
    ];

    // Dữ liệu cho Poker Tour
    const pokerToursData = [
        {
            name: "Poker Tour 1",
            address: "Địa chỉ Poker Tour 1",
            logo: "link-logo-tour-1.png",
        },
        {
            name: "Poker Tour 2",
            address: "Địa chỉ Poker Tour 2",
            logo: "link-logo-tour-2.png",
        },
        // Thêm các đối tượng poker tour khác (nếu có)
    ];

    const handlePokerRoomSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedPokerRoom(event.target.value);
        onPokerRoomSelectChange(event.target.value);
    };

    const handlePokerTourSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedPokerTour(event.target.value);
        onPokerTourSelectChange(event.target.value);
    };

    return (
        <div>



            <div className='flex justify-start items-center'>
                {showPokerRoom && (
                    <div className="mb-4 w-full">
                        <label className="block text-lg text-left font-medium text-gray-700">
                            Select Poker Room:
                        </label>
                        <select className="block w-full px-4 py-1 border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none" value={selectedPokerRoom}
                            onChange={handlePokerRoomSelectChange}>
                            {pokerRoomsData.map((pokerRoom, index) => (
                                <option key={index} value={pokerRoom.name}>
                                    {pokerRoom.name}
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
                        <select className="block w-full px-4 py-1 border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none" value={selectedPokerTour}
                            onChange={handlePokerTourSelectChange}>
                            {pokerToursData.map((pokerTour, index) => (
                                <option key={index} value={pokerTour.name}>
                                    {pokerTour.name}
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
                        <select className="block w-full px-4 py-1 border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none" value={selectedPokerTour}
                            onChange={handlePokerTourSelectChange}>
                            {pokerToursData.map((pokerTour, index) => (
                                <option key={index} value={pokerTour.name}>
                                    {pokerTour.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4 w-[50%]">
                        <label className="block text-lg text-left font-medium text-gray-700">
                            Select Poker Room:
                        </label>
                        <select className="block w-full  px-4 py-1 border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none" value={selectedPokerRoom}
                            onChange={handlePokerRoomSelectChange}>
                            {pokerRoomsData.map((pokerRoom, index) => (
                                <option key={index} value={pokerRoom.name}>
                                    {pokerRoom.name}
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

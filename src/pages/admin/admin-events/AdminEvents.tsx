import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputAdmin from '../../../components/components-admin/InputAdmin';


const AdminEvents = () => {
    const [nameEvent, setNameEvent] = useState("");

    const [venueEvent, setVenueEvent] = useState("");
    const [dateEvent, setDateEvent] = useState("")
    const [resultsPrize, setResultsPrize] = useState([]);
    const [entries, setEntries] = useState<string | number>("");
    const [buyIn, setBuyIn] = useState<string | number>("");


    const handleNameEventChange = (value: string | number) => {
        setNameEvent(String(value));
    };
    const handlEvenueEventtChange = (value: string | number) => {
        setVenueEvent(String(value));
    };
    const handlDateEventChange = (value: string | number) => {
        setNameEvent(String(value));
    };

    const handleBuyInChange = (value: string | number) => {
        setBuyIn(Number(value));
    };
    const handleEntriesChange = (value: string | number) => {
        setBuyIn(Number(value));
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
                        <span className="text-blue-400 font-bold">12</span>
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
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default AdminEvents

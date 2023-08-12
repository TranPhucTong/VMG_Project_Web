import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import InputAdmin from '../../../components/components-admin/InputAdmin';
import ButtonAdmin from '../../../components/components-admin/ButtonAdmin';
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import storage from "../../../firebase/firebase";
import { useSelector } from 'react-redux';
import { updatePlayer } from '../../../reducers/slices/updatePlayerSlice';
import playerApi from '../../../api/playerApi';
import { toast } from 'react-toastify';
import configRoutes from '../../../config/configRouter';
import axios from 'axios';

interface HistoryEventItem {
    _id: string;
    nameEvent: string;
    dateEvent: string;
    place: number;
    entries: number;
    buyin: number;
    prize: number;
}
type ListHistoryEventArray = HistoryEventItem[];



interface PlayerID {
    _id: number;
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

interface City {
    country: string;
    geonameid: number;
    name: string;
    subcountry: string;
}

interface CountryInfo {
    name: string;
    flag: string;
}

const REST_COUNTRIES_API = "https://restcountries.com/v3.1";
const AdminUpdatePlayer = () => {
    const { id } = useParams();
    const [dataPlayerID, setDataPlayerID] = useState<PlayerID | null>(null);





    const navigate = useNavigate();
    const [data, setData] = useState<City[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const [isFormComplete, setIsFormComplete] = useState(false);
    const [namePlayer, setNamePlayer] = useState("");
    const [getCountry, setCountry] = useState<string | undefined>("");
    const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
    const [getState, setState] = useState<string[]>([]);
    const [selectedState, setSelectedState] = useState<string | undefined>();
    const [linkInfo, setLinkInfo] = useState("");
    const historyEvent: ListHistoryEventArray = (dataPlayerID?.historyEvent ?? []) as ListHistoryEventArray;


    const tableClass = "table w-full border-collapse table-auto";
    const tableHeaderClass = "bg-gray-200 text-gray-600 uppercase text-sm leading-normal";
    const tableRowClass = "border bg-white hover:bg-gray-100";


    const country1 = [...new Set(data.map((item) => item.country))].sort();
    const SPECIAL_CITIES = ["Ho Chi Minh city", "Ha Nội", "Đà Nẵng"];


    //Hàm hỗ trợ
    const formatCityName = (city: string): string => {
        if (city === "Ha Nội") {
            return "Hà Nội";
        } else if (city === "Ho Chi Minh city")
            return "Thành phố Hồ Chí Minh"
        return city;
    };

    const formatCountryName = (country: string): string => {
        if (country === "Vietnam") {
            return "Việt Nam";
        }
        return country;
    };
    const findOriginalCityName = (formattedCity: string): string => {
        if (formattedCity === "Thành phố Hồ Chí Minh") {
            return "Ho Chi Minh city";
        } else if (formattedCity === "Hà Nội") {
            return "Ha Nội";
        }
        return formattedCity;
    };
    const findOriginalCountryName = (formattedCountry: string): string => {
        if (formattedCountry === "Việt Nam") {
            return "Vietnam";
        }
        return formattedCountry;
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


    //Handles
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
                            setSelectedImage(downloadURL); // Lưu đường dẫn ảnh sau khi upload vào state selectedImage
                        });
                    }
                );
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };
    const handleNameChange = (value: string | number) => {
        setNamePlayer(String(value));
    };
    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCountry = e.target.value;
        const formattedCountry = formatCountryName(selectedCountry);
        setCountry(formattedCountry);
    };
    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCity = e.target.value;
        const formattedCity = formatCityName(selectedCity);
        setSelectedState(formattedCity);
    };
    const handleLinkInfoChange = (value: string | number) => {
        setLinkInfo(String(value));
    };


    const fetchData = async () => {
        if (typeof id === 'string') {
            const res = await playerApi.getPlayerById(id);
            setDataPlayerID(res.data.player);
        } else {
            alert("Không tìm thấy ID !!!")
        }
    }

    useEffect(() => {
        if (namePlayer !== "" && getCountry !== "" && selectedImage !== "") {
            setIsFormComplete(true);
        } else {
            setIsFormComplete(false);
        }
    }, [namePlayer, getCountry, selectedImage]);

    useEffect(() => {
        fetchData();
    }, [id]); // Gọi fetchData khi id thay đổi

    useEffect(() => {
        if (dataPlayerID) {
            setSelectedImage(dataPlayerID.avatarImage);
            setNamePlayer(dataPlayerID.playerName);
            setCountry(dataPlayerID.country);
            setLinkInfo(dataPlayerID.linkInfo);
            setSelectedState(dataPlayerID.city);
        }
    }, [dataPlayerID]);

    useEffect(() => {
        axios
            .get<City[]>(
                "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
            )
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (getCountry) {
            let states = data
                .filter((state) => state.country === findOriginalCountryName(getCountry))
                .map((item) => item.subcountry);
            states = [...new Set(states)].sort();
            setState(states);

            axios
                .get(`${REST_COUNTRIES_API}/name/${getCountry}`)
                .then((res) => {
                    if (res.data.length > 0) {
                        setCountryInfo({
                            name: res.data[0].name.common,
                            flag: res.data[0].flags.png
                        });
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [data, getCountry]);

    // Xử lý trường hợp chưa có dữ liệu hoặc đang tải dữ liệu
    if (!dataPlayerID) {
        return <div>Loading...</div>;
    }

    //Các hàm xử lý sự kiện button click
    const clickUpdatePlayer = async () => {
        const dataUpdatePlayer: Object = {
            playerName: namePlayer,
            avatarImage: selectedImage,
            country: getCountry,
            city: selectedState ? selectedState : "",
            linkInfo: linkInfo ? linkInfo : "",
        };
        if (typeof id === 'string') {
            try {
                const response = await playerApi.updatePlayer(dataUpdatePlayer, id);
                toast.success("Cập nhật thông tin người chơi thành công");
                navigate("/admin/player");
            } catch (error) {
                toast.error("Thất bại. Hãy kiểm tra và thử lại!!!")
            }
        }
    }

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
                <h1 className="text-2xl font-bold text-left">Update Infomations Player</h1>
            </div>
            <div className="mt-5 rounded-lg bg-white shadow-xl">
                <div className="p-8">
                    <div className="flex gap-12">
                        <div className="flex flex-col w-[30%] items-center">
                            <div
                                className={`rounded-full overflow-hidden w-48 h-48 border-4 ${selectedImage ? "border-green-500" : "border-gray-500"
                                    }`}
                            >
                                {selectedImage ? (
                                    <img
                                        src={selectedImage}
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
                                Edit photo
                                <input
                                    type="file"
                                    id="image-input"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                        <div className="w-[70%] flex justify-center gap-16">
                            <div className="flex flex-col gap-10">
                                <InputAdmin
                                    type="text"
                                    value={namePlayer}
                                    onChange={handleNameChange}
                                    label="Name Player"
                                    validate={(value) => /^[A-Za-z\s]+$/.test(namePlayer)}
                                    placeholder="Vui lòng nhập tên ở đây"
                                />
                            </div>
                            <div className="flex flex-col gap-10">
                                <InputAdmin
                                    type="text"
                                    value={linkInfo}
                                    onChange={handleLinkInfoChange}
                                    label="Link Info"
                                    placeholder="Vui lòng nhập đường link"
                                />

                                <div className="w-full flex flex-col justify-center items-start gap-1">
                                    <div className="flex justify-center items-end gap-4">
                                        <div className="">
                                            <h2 className="text-left font-bold">Select a country:</h2>
                                            <select className="border border-gray-400 rounded-md py-2 px-4 w-full" onChange={handleCountryChange} value={findOriginalCountryName(getCountry ? getCountry : "")}>
                                                {country1.map((items) => (
                                                    <option key={items} value={findOriginalCountryName(items)}>
                                                        {formatCountryName(items)}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {countryInfo && (
                                            <div className="">
                                                <img className={`w-16 h-11 object-cover rounded-lg`} src={countryInfo.flag} alt={`${countryInfo.name} Flag`} />
                                            </div>
                                        )}
                                    </div>
                                    <h2 className="font-bold">Select a city:</h2>
                                    <select className="border border-gray-400 rounded-md py-2 px-4 w-full" onChange={handleCityChange} value={findOriginalCityName(selectedState ? selectedState : "")}>
                                        <option value="">Select City</option>
                                        {[...SPECIAL_CITIES, ...getState.filter(city => !SPECIAL_CITIES.includes(city))]
                                            .map((items) => (
                                                <option key={items} value={findOriginalCityName(items)}>
                                                    {formatCityName(items)}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <ButtonAdmin isFormComplete={isFormComplete} color="blue" onClick={clickUpdatePlayer}>
                                    Update
                                </ButtonAdmin>
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
            <div className="p-2 w-full mt-4 bg-white rounded-xl shadow-xl">
                <div className='mb-4 text-left'>
                    <h2 className='text-xl font-bold text-blue-500 uppercase'>events attended</h2>
                </div>
                <table className={`${tableClass} h-full`}>
                    <thead>
                        <tr>
                            <th className={tableHeaderClass}>STT</th>
                            <th className={tableHeaderClass}>Event Name</th>
                            <th className={tableHeaderClass}>Rank</th>
                            <th className={tableHeaderClass}>Prize</th>
                            <th className={tableHeaderClass}>Buy In</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyEvent.map((event, index) => (
                            <tr key={index} className={tableRowClass}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td onClick={() => handleSelectDetailsEvent(event)} className="border px-4 py-2 underline hover:text-blue-500 cursor-pointer font-bold">{event.nameEvent}</td>
                                <td className="border px-4 py-2 font-bold"> <span className='text-blue-500'>{getRankFormat(event.place)}</span> <span className='text-gray-500'>/</span> <span className='text-green-500'>{event.entries}</span></td>
                                <td className="border px-4 py-2">{(event.prize).toLocaleString()} VNĐ</td>
                                <td className="border px-4 py-2">{(event.buyin).toLocaleString()} VNĐ</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminUpdatePlayer

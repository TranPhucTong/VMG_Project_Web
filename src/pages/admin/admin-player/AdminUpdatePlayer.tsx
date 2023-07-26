import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
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
const AdminUpdatePlayer = () => {
    const navigate = useNavigate();
    const transiData = useSelector(updatePlayer);
    const idPlayer = transiData.id;
    const [selectedImage, setSelectedImage] = useState<string | null>(transiData.image);
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [namePlayer, setNamePlayer] = useState(transiData.playerName);
    const [country, setCountry] = useState(transiData.country);
    const [city, setCity] = useState(transiData.city);
    const [linkInfo, setLinkInfo] = useState(transiData.linkInfo);
    const historyEvent : ListHistoryEventArray =  Object.values(transiData.historyEvent) as ListHistoryEventArray;


    const tableClass = "table w-full border-collapse table-auto";
    const tableHeaderClass = "bg-gray-200 text-gray-600 uppercase text-sm leading-normal";
    const tableRowClass = "border bg-white hover:bg-gray-100";
    


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

    useEffect(() => {
        if (namePlayer !== "" && country !== "" && city !== "" && linkInfo !== "" && selectedImage !== "") {
            setIsFormComplete(true);
        } else {
            setIsFormComplete(false);
        }
    }, [namePlayer, country, city, linkInfo, selectedImage]);

    const handleNameChange = (value: string | number) => {
        setNamePlayer(String(value));
    };
    const handleCountryChange = (value: string | number) => {
        setCountry(String(value));
    };
    const handleCityChange = (value: string | number) => {
        setCity(String(value));
    };
    const handleLinkInfoChange = (value: string | number) => {
        setLinkInfo(String(value));
    };

    const clickUpdatePlayer = async () => {
        const dataUpdatePlayer: Object = {
            playerName: namePlayer,
            avatarImage: selectedImage,
            country: country,
            city: city,
            linkInfo: linkInfo,
        };

        try {
            const response = await playerApi.updatePlayer(dataUpdatePlayer, idPlayer);
            console.log("Thành công", response);
            toast.success("Cập nhật thông tin người chơi thành công");
            navigate("/admin/player");
        } catch (error) {
            console.log("Thất bại", error);
            toast.error("Thất bại. Hãy kiểm tra và thử lại!!!")
        }
    }
    return (
        <div>
            <div className="flex flex-col gap-1">
                <div
                    onClick={() => navigate("/admin/player")}
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

                                <InputAdmin
                                    type="text"
                                    value={country}
                                    onChange={handleCountryChange}
                                    label="Country"
                                    placeholder="Vui lòng nhập quốc gia"
                                />
                            </div>
                            <div className="flex flex-col gap-10">
                                <InputAdmin
                                    type="text"
                                    value={city}
                                    onChange={handleCityChange}
                                    label="City"
                                    validate={(value) => /^[A-Za-z1-9\s]+$/.test(city)}
                                    placeholder="Vui lòng nhập thành phố"
                                />
                                <InputAdmin
                                    type="text"
                                    value={linkInfo}
                                    onChange={handleLinkInfoChange}
                                    label="Link Info"
                                    placeholder="Vui lòng nhập đường link"
                                />

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
                                    <td className="border px-4 py-2 underline hover:text-blue-500 cursor-pointer">{event.nameEvent}</td>
                                    <td className="border px-4 py-2">{event.place}</td>
                                    <td className="border px-4 py-2">{event.prize}</td>
                                    <td className="border px-4 py-2">{event.buyin}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </div>
    )
}

export default AdminUpdatePlayer

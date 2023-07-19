import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputAdmin from "../../../components/components-admin/InputAdmin";
import playerApi from "../../../api/playerApi";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import storage from "../../../firebase/firebase";
const AdminAddPlayer = () => {
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  //Input
  const [namePlayer, setNamePlayer] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [linkInfo, setLinkInfo] = useState("");

  const clickAddPlayer = async () => {
    const dataCreate: Object = {
      playerName: namePlayer,
      avatarImage: selectedImage,
      country: country,
      city: city,
      linkInfo: linkInfo,
    };

    try {
      const response = await playerApi.createPlayer(dataCreate);
      console.log("Thành công", response);
    } catch (error) {
      console.log("Thất bại", error);
    }
  };

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

  // const handleSelectChange = (value: string) => {
  //   setSelectValue(value);
  // };

  return (
    <div className="">
      <div className="flex flex-col gap-1">
        <div
          onClick={() => navigate("/admin/player")}
          className={`flex text-base text-gray-500 font-medium gap-2 items-center cursor-pointer hover:-translate-x-1 transform transition-transform 
          `}
        >
          <FontAwesomeIcon className="font-extrabold" icon={faChevronLeft} />
          <h2>Back</h2>
        </div>
        <h1 className="text-2xl font-bold text-left">Create New Player</h1>
      </div>
      <div className="mt-5 rounded-lg bg-white shadow-xl">
        <div className="p-8">
          <div className="flex gap-12">
            <div className="flex flex-col w-[30%] items-center">
              <div
                className={`rounded-full overflow-hidden w-48 h-48 border-4 ${
                  selectedImage ? "border-green-500" : "border-gray-500"
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
                />

                <InputAdmin
                  type="text"
                  value={country}
                  onChange={handleCountryChange}
                  label="Country"
                />
              </div>
              <div className="flex flex-col gap-10">
                <InputAdmin
                  type="text"
                  value={city}
                  onChange={handleCityChange}
                  label="City"
                  validate={(value) => /^[A-Za-z1-9\s]+$/.test(city)}
                />
                <InputAdmin
                  type="text"
                  value={linkInfo}
                  onChange={handleLinkInfoChange}
                  label="Link Info"
                />

                <button
                  onClick={() => clickAddPlayer()}
                  className="p-3 bg-blue-500 text-white font-bold"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddPlayer;

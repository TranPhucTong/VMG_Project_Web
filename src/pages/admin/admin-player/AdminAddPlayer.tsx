import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputAdmin from "../../../components/components-admin/InputAdmin";
import playerApi from "../../../api/playerApi";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import storage from "../../../firebase/firebase";
import ButtonAdmin from "../../../components/components-admin/ButtonAdmin";
import { toast } from "react-toastify";
import Select from 'react-select';
import axios from 'axios';
import imgPlayerDefauth from "../../../images/player_img.png"

interface CountryOption {
  value: string;
  label: string;
}

interface CityOption {
  value: string;
  label: string;
}

interface City {
  country: string;
  geonameid: number;
  name: string;
  subcountry: string;
}


const AdminAddPlayer = () => {
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);
  // const [cities, setCities] = useState<CityOption[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
  const navigate = useNavigate();


  const [selectedImage, setSelectedImage] = useState<string | null>(imgPlayerDefauth);
  const [isFormComplete, setIsFormComplete] = useState(false);


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
  const [linkInfo, setLinkInfo] = useState("");
  const [data, setData] = useState<City[]>([]);
  const [getCountry, setCountry] = useState<string | undefined>();
  const [getState, setState] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string | undefined>();
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    if (namePlayer !== "" && getCountry !== undefined && selectedState !== undefined && linkInfo !== "" && selectedImage !== null) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [namePlayer, getCountry, selectedState, linkInfo, selectedImage]);

  const defauthValue = () => {
    setSelectedImage(null);
    setNamePlayer("");
    setSelectedState("");
    setCountry("");
    setLinkInfo("");
  }

  const clickAddPlayer = async () => {
    const dataCreate: Object = {
      playerName: namePlayer,
      avatarImage: selectedImage,
      country: getCountry,
      city: selectedState,
      linkInfo: linkInfo,
    };

    try {
      const response = await playerApi.createPlayer(dataCreate);
      console.log("Thành công", response);
      toast.success("Thêm người chơi mới thành công");
      defauthValue();
    } catch (error) {
      console.log("Thất bại", error);
      toast.error("Trùng tên hoặc chưa nhập đầy đủ thông tin. Vui lòng kiểm tra lại!!!")
    }
  };

  const handleNameChange = (value: string | number) => {
    setNamePlayer(String(value));
  };
  const handleLinkInfoChange = (value: string | number) => {
    setLinkInfo(String(value));
  };

  // const handleSelectChange = (value: string) => {
  //   setSelectValue(value);
  // };


  
  

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
        .filter((state) => state.country === getCountry)
        .map((item) => item.subcountry);
      states = [...new Set(states)].sort();
      setState(states);
    }
  }, [data, getCountry]);

  useEffect(() => {
    if (selectedState) {
      const cities = data.filter(
        (city) => city.subcountry === selectedState
      );
      setCities(cities);
    }
  }, [data, selectedState]);

  const country1 = [...new Set(data.map((item) => item.country))].sort();




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
                  // validate={(value) => /^[A-Za-z\s]+$/.test(namePlayer)}
                  placeholder="Vui lòng nhập tên ở đây"
                />
                <InputAdmin
                  type="text"
                  value={linkInfo}
                  onChange={handleLinkInfoChange}
                  label="Link Info"
                  placeholder="Vui lòng nhập đường link"
                />

                <div className="w-full flex flex-col justify-center items-center gap-4">
                  <div className="w-full flex flex-col justify-center items-start gap-1">
                    <label>Country:</label>
                    <select className="border border-gray-400 rounded-md py-2 px-4" onChange={(e) => setCountry(e.target.value)}>
                      <option value="">Select Country</option>
                      {country1.map((items) => (
                        <option key={items} value={items}>
                          {items}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full flex flex-col justify-center items-start gap-1">
                    <label>City:</label>
                    <select className="border border-gray-400 rounded-md py-2 px-4 w-full" onChange={(e) => setSelectedState(e.target.value)}>
                      <option value="">Select City</option>
                      {getState.map((items) => (
                        <option key={items} value={items}>
                          {items}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* <div>
                    <label>City:</label>
                    <select>
                      <option value="">Select City</option>
                      {cities.map((items) => (
                        <option key={items.geonameid} value={items.name}>
                          {items.name}
                        </option>
                      ))}
                    </select>
                  </div> */}
                </div>

                <ButtonAdmin isFormComplete={isFormComplete} color="blue" onClick={clickAddPlayer}>
                  Add New Player
                </ButtonAdmin>
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

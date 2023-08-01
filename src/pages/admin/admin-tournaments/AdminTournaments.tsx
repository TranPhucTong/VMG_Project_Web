import React, { ChangeEvent, useState } from 'react';
import { toast } from "react-toastify";
import storage from "../../../firebase/firebase";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import InputAdmin from '../../../components/components-admin/InputAdmin';
import OrganizationalCheckbox from '../../../components/components-admin/OrganizationalCheckbox';

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

const AdminTournaments = () => {
  const [selectedImageTour, setSelectedImageTour] = useState<string | null>("");
  const [nameTour, setNameTour] = useState("");
  const [dateTourStart, setDateTourStart] = useState("")
  const [dateTourEnd, setDateTourEnd] = useState("");
  const [venueEvent, setVenueEvent] = useState("");

  const [isChecked, setIsChecked] = useState(false);

  const [selectedPokerTour, setSelectedPokerTour] = useState<PokerTours | null>(null);
  const [selectedPokerRoom, setSelectedPokerRoom] = useState<PokerRooms | null>(null);


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
              setSelectedImageTour(downloadURL); // Lưu đường dẫn ảnh sau khi upload vào state selectedImage
            });
          }
        );
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleNameTourChange = (value: string | number) => {
    setNameTour(String(value));
  };
  const handlDateTourStartChange = (value: string | number) => {
    setDateTourStart(String(value));
  };
  const handlDateTourEndChange = (value: string | number) => {
    setDateTourEnd(String(value));
  };
  const handlePokerTourChange = (tour: PokerTours | null) => {
    setSelectedPokerTour(tour);
  };

  const handlePokerRoomChange = (room: PokerRooms | null) => {
    setSelectedPokerRoom(room);
  };

  const handleVenueCheckboxChange = () => {
    setIsChecked((prev) => !prev); // Đảo ngược trạng thái của ô checkbox
    if (!isChecked && selectedPokerRoom) {
      // Nếu ô checkbox trước đó không được tích và có selectedPokerRoom, gán giá trị của selectedPokerRoom.Adress cho venueEvent
      setVenueEvent(selectedPokerRoom.Adress);
    } else {
      // Nếu ô checkbox trước đó được tích hoặc không có selectedPokerRoom, đặt venueEvent về rỗng
      setVenueEvent("");
    }
  };

  const handlEvenueEventtChange = (value: string | number) => {
    if (!isChecked) {
      // Nếu ô checkbox không được tích, cập nhật giá trị cho venueEvent
      setVenueEvent(String(value));
    }
  };
  return (
    <div>
      <div className="flex justify-between gap-8 items-center">
        <div className="flex gap-8 justify-center items-center">
          <h1 className="text-3xl font-medium text-left tracking-wide">
            Tournaments
          </h1>
          <p className="font-normal tracking-wide flex gap-1 justify-center items-center text-sm">
            Quantity:{" "}
            <span className="text-blue-400 font-bold">20</span>
          </p>
        </div>
      </div>
      <div className="mt-5 rounded-lg bg-white shadow-xl">
        <div className='px-8 py-4 text-left'>
          <h1 className='text-2xl font-bold text-left'>Create New Tournament</h1>
        </div>
        <div className='px-8 pb-4 flex gap-6 h-auto'>
          <div className='flex flex-col justify-center items-center w-[50%]'>
            <div className='w-full flex-col flex gap-3'>
              <div className="flex flex-col w-full items-center">
                <div
                  className={`rounded-full overflow-hidden w-48 h-48 border-4 ${selectedImageTour ? "border-green-500" : "border-gray-500"
                    }`}
                >
                  {selectedImageTour ? (
                    <img
                      src={selectedImageTour}
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
                  Edit Image Tournament
                  <input
                    type="file"
                    id="image-input"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <InputAdmin
                type="text"
                value={nameTour}
                onChange={handleNameTourChange}
                label="Name Tour"
                // validate={(value) => /^[A-Za-z\s]+$/.test(namePlayer)}
                placeholder="Vui lòng nhập tên ở đây"
              />
            </div>
          </div>
          <div className='flex flex-col justify-center h-full items-center w-[50%]'>
            <div className='w-full flex-col justify-between h-full flex gap-3'>
              <div className='flex justify-start gap-8 items-center'>
                <div className='w-[50%]'>
                  <InputAdmin
                    type="date"
                    value={dateTourStart}
                    onChange={handlDateTourStartChange}
                    label="Date Tournament Start"
                    placeholder="Vui lòng nhập ở đây"
                  />
                </div>
                <div className='mt-6'>-</div>
                <div className='w-[50%]'>
                  <InputAdmin
                    type="date"
                    value={dateTourEnd}
                    onChange={handlDateTourEndChange}
                    label="Date Tournament End"
                    placeholder="Vui lòng nhập ở đây"
                  />
                </div>
              </div>
              <div className=''>
                <OrganizationalCheckbox onPokerTourChange={handlePokerTourChange}
                  onPokerRoomChange={handlePokerRoomChange} />
              </div>
              <div className='flex justify-between gap-2 items-center'>
                <div className='w-[70%]'>
                  <InputAdmin
                    type="text"
                    value={isChecked ? selectedPokerRoom?.Adress || "" : venueEvent}
                    onChange={handlEvenueEventtChange}
                    label="Venue Event"
                    placeholder="Vui lòng nhập ở đây"
                  />
                </div>
                {selectedPokerRoom !== null ? (
                  <div className='w-[30%] flex mt-6 gap-1 justify-center items-center'>
                    <input
                      type="checkbox"
                      checked={isChecked} // Đảm bảo checkbox được chọn khi có selectedPokerRoom
                      onChange={handleVenueCheckboxChange}
                    />
                    <p>Adress Poker Room</p>
                  </div>
                ) : ("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminTournaments

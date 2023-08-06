import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import storage from "../../../firebase/firebase";
import InputAdmin from "../../../components/components-admin/InputAdmin";
import TextArea from "../../../components/components-admin/TextArea";
import pokerTourApi from "../../../api/adminPokerTourApi";
import { toast } from "react-toastify";
import ButtonAdmin from "../../../components/components-admin/ButtonAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEllipsis,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

interface PokerTours {
  _id: string;
  name: string;
  shortName: string;
  logo: string;
  avatar: string;
  description: string;
}

const AdminPokerTour = () => {
  const [selectedLogo, setSelectedLogo] = useState<string | null>("");
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>("");
  const [namePokerTour, setNamePokerTour] = useState("");
  const [shortName, setShortName] = useState("");
  const [description, setDescription] = useState<string>("");

  //Modal
  const [idModal, setIdModal] = useState<string | null>("");
  const [selectedLogoModal, setSelectedLogoModal] = useState<string | null>("");
  const [selectedAvatarModal, setSelectedAvatarModal] = useState<string | null>(
    ""
  );
  const [namePokerTourModal, setNamePokerTourModal] = useState("");
  const [shortNameModal, setShortNameModal] = useState("");
  const [descriptionModal, setDescriptionModal] = useState<string>("");

  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isFormCompleteModal, setIsFormCompleteModal] = useState(false);
  const [showDetailPokerTour, setShowDetailPokerTour] = useState(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const [dataPokerTour, setDataPokerTour] = useState<PokerTours[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);

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
              setSelectedLogo(downloadURL); // Lưu đường dẫn ảnh sau khi upload vào state selectedImage
            });
          }
        );
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleImageModalChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
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
              setSelectedLogoModal(downloadURL); // Lưu đường dẫn ảnh sau khi upload vào state selectedImage
            });
          }
        );
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleAvartarChange = async (event: ChangeEvent<HTMLInputElement>) => {
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
              setSelectedAvatar(downloadURL); // Lưu đường dẫn ảnh sau khi upload vào state selectedImage
            });
          }
        );
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleAvartarModalChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
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
              setSelectedAvatarModal(downloadURL); // Lưu đường dẫn ảnh sau khi upload vào state selectedImage
            });
          }
        );
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleNamePokerTourChange = (value: string | number) => {
    setNamePokerTour(String(value));
  };
  const handleShortNameChange = (value: string | number) => {
    setShortName(String(value));
  };
  const handleContentChange = (content: string) => {
    setDescription(content);
  };

  // HandleModal
  const handleNamePokerTourChangeModal = (value: string | number) => {
    setNamePokerTourModal(String(value));
  };
  const handleShortNameChangeModal = (value: string | number) => {
    setShortNameModal(String(value));
  };
  const handleContentChangeModal = (content: string) => {
    setDescriptionModal(content);
  };

  useEffect(() => {
    if (
      namePokerTour !== "" &&
      selectedAvatar !== "" &&
      selectedLogo !== "" &&
      shortName !== "" &&
      description !== ""
    ) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [namePokerTour, selectedAvatar, selectedLogo, shortName, description]);

  useEffect(() => {
    if (
      namePokerTourModal !== "" &&
      selectedAvatarModal !== "" &&
      selectedLogoModal !== "" &&
      shortNameModal !== "" &&
      descriptionModal !== ""
    ) {
      setIsFormCompleteModal(true);
    } else {
      setIsFormCompleteModal(false);
    }
  }, [
    namePokerTourModal,
    selectedAvatarModal,
    selectedLogoModal,
    shortNameModal,
    descriptionModal,
  ]);

  const defauthValue = () => {
    setNamePokerTour("");
    setDescription("");
    setShortName("");
    setSelectedLogo("");
    setSelectedAvatar("");
  };
  const clickAddPokerTour = async () => {
    const dataCreate: Object = {
      name: namePokerTour,
      shortName: shortName,
      logo: selectedLogo,
      avatar: selectedAvatar,
      description: description,
    };

    try {
      const response = await pokerTourApi.createPokerTour(dataCreate);
      console.log("Thành công", response);
      toast.success("Create poker tour successfully");
      defauthValue();
    } catch (error) {
      console.log("Thất bại", error);
      toast.error("Create failure. Please check your input again!!!");
    }
  };

  const clickUpdatePokerTour = async () => {
    const dataUpdate: Object = {
      name: namePokerTourModal,
      shortName: shortNameModal,
      logo: selectedLogoModal,
      avatar: selectedAvatarModal,
      description: descriptionModal,
    };

    try {
      const res = await pokerTourApi.updatePokerTour(
        idModal ? idModal : "",
        dataUpdate
      );
      toast.success("Cập nhật thông tin poker tour thành công");
      setShowDetailPokerTour(false);
    } catch (error) {
      toast.error("Cập nhật poker tour thất bại, vui lòng kiểm tra lại!!!");
    }
  };

  const clickDeletePokerTour = async (id: string) => {
    try {
      const res = await pokerTourApi.deletePokerTour(id);
      toast.success("Xóa poker tour thành công");
    } catch (error) {
      toast.error("Xóa thất bại, vui lòng kiểm tra lại!!!");
    }
  };

  const totalPages: number = Math.ceil(dataPokerTour.length / rowsPerPage);
  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setRowsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };
  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };
  const startIndex: number = (currentPage - 1) * rowsPerPage;
  const endIndex: number = startIndex + rowsPerPage;
  const currentRows: PokerTours[] = dataPokerTour.slice(startIndex, endIndex);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const handleMenuToggle = (rowIndex: number) => {
    setSelectedRow(selectedRow === rowIndex ? null : rowIndex);
  };

  let totalPokerTours = 0;

  const demMang = () => {
    for (var i = 0; i < dataPokerTour.length; i++) {
      totalPokerTours = i + 1;
    }
  };
  demMang();

  const fetchData = async () => {
    const res = await pokerTourApi.getPokerTour();
    setDataPokerTour(res.data.data);
  };

  useEffect(() => {
    fetchData();
  }, [dataPokerTour]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setSelectedRow(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  });

  const handleSelectDetailsPokerTour = (pokerTour: any) => {
    setShowDetailPokerTour(true);
    setDescriptionModal(pokerTour.description);
    setNamePokerTourModal(pokerTour.name);
    setSelectedAvatarModal(pokerTour.avatar);
    setSelectedLogoModal(pokerTour.logo);
    setShortNameModal(pokerTour.shortName);
    setIdModal(pokerTour._id);
  };

  return (
    <div>
      <div className="flex justify-between gap-8 items-center">
        <div className="flex gap-8 justify-center items-center">
          <h1 className="text-3xl font-medium text-left tracking-wide">
            Poker Tours
          </h1>
          <p className="font-normal tracking-wide flex gap-1 justify-center items-center text-sm">
            Quantity:{" "}
            <span className="text-blue-400 font-bold">{totalPokerTours}</span>
          </p>
        </div>
      </div>
      <div className="mt-5 rounded-lg bg-white shadow-xl">
        <div className="px-8 py-4 text-left">
          <h1 className="text-2xl font-bold text-left">
            Create New Poker Tour
          </h1>
        </div>
        <div className="px-8 pb-4 flex gap-6">
          <div className="flex flex-col justify-start items-center w-[50%]">
            <div className="w-full flex-col flex gap-5">
              <div className="flex flex-col w-full items-center">
                <div
                  className={`rounded-full overflow-hidden w-48 h-48 border-4 ${
                    selectedLogo ? "border-green-500" : "border-gray-500"
                  }`}
                >
                  {selectedLogo ? (
                    <img
                      src={selectedLogo}
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
                  Edit LOGO
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
                value={namePokerTour}
                onChange={handleNamePokerTourChange}
                label="Name Poker Tour"
                // validate={(value) => /^[A-Za-z\s]+$/.test(namePlayer)}
                placeholder="Enter poker tour name here"
              />
              <InputAdmin
                type="text"
                value={shortName}
                onChange={handleShortNameChange}
                label="Short Name"
                // validate={(value) => /^[A-Za-z\s]+$/.test(namePlayer)}
                placeholder="Enter initials here"
              />
            </div>
          </div>
          <div className="flex flex-col justify-start items-center w-[50%]">
            <div className="w-full flex-col flex gap-3">
              <div className="flex flex-col w-full items-center">
                <div
                  className={`rounded-2xl overflow-hidden w-72 h-48 border-4 ${
                    selectedAvatar ? "border-green-500" : "border-gray-500"
                  }`}
                >
                  {selectedAvatar ? (
                    <img
                      src={selectedAvatar}
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
                  htmlFor="image-input-avt"
                  className="mt-4 px-4 py-2 bg-blue-500 text-base rounded-2xl text-white font-bold cursor-pointer custom-file-input"
                >
                  Edit Avatar
                  <input
                    type="file"
                    id="image-input-avt"
                    accept="image/*"
                    onChange={handleAvartarChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <div className="container mx-auto my-4">
              <h1 className="text-xl font-bold text-left">Description</h1>
              <TextArea
                value={description}
                onContentChange={handleContentChange}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 pb-4 flex justify-center items-center w-[full] gap-6">
          <ButtonAdmin
            isFormComplete={isFormComplete}
            color="blue"
            onClick={clickAddPokerTour}
          >
            Add New Poker Tour
          </ButtonAdmin>
        </div>
      </div>

      <div className="mt-5 rounded-lg bg-white shadow-xl">
        <div className="px-8 py-4 text-left">
          <h1 className="text-2xl font-bold text-left">List Poker Tours</h1>
        </div>
        <div className="text-left p-6 border-b flex justify-between items-center border-solid md:flex-row md:items-center md:gap-0 border-secondary text-sm md:text-base">
          <div>
            <span>Show rows per page:</span>
            <select
              className="ml-1 px-2 py-1 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto pb-14">
          <table className="w-full text-sm text-dark-purple transition-all duration-500 ease-in-out ">
            {/* Render các hàng trong bảng */}
            <thead>
              <tr className="border-b border-solid border-gray-400">
                <th className=" px-[16px] py-[20px] text-left min-w-[80px] pl-[24px] pr-[8px]">
                  <input
                    type="checkbox"
                    className="w-4 h-4 relative top-[2px] cursor-pointer"
                  />
                </th>
                <th className="px-[16px] py-[20px] text-center min-w-[80px]">
                  STT
                </th>
                <th className="px-[16px] py-[20px] text-center min-w-[80px]">
                  Poker Tour Name
                </th>
                <th className="px-[16px] py-[20px] text-center min-w-[80px]">
                  Short Name
                </th>
                <th className="px-[16px] py-[20px] text-center min-w-[80px]">
                  Logo
                </th>
                <th className="px-[16px] py-[20px] text-center min-w-[80px]">
                  Avatar
                </th>
                <th className="px-[16px] py-[20px] text-center min-w-[80px]">
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b-[5px] shadow-sm border-solid border-[#f4f4f9]
                  ${
                    index % 2 === 0
                      ? "border-l-4 border-l-blue-500"
                      : "border-l-4 border-l-green-500"
                  }
                  `}
                >
                  <td className=" px-[16px] py-[20px] text-left min-w-[80px] pl-[24px] pr-[8px]">
                    <input
                      className="w-4 h-4 relative top-[2px] cursor-pointer"
                      type="checkbox"
                    />
                  </td>
                  <td className="px-[16px] py-[20px] text-center min-w-[80px]">
                    {startIndex + index + 1}
                  </td>
                  <td
                    onClick={() => handleSelectDetailsPokerTour(row)}
                    className="px-[16px] py-[20px] text-center font-bold hover:text-blue-400 min-w-[80px] underline cursor-pointer"
                  >
                    {row.name}
                  </td>
                  <td className="px-[16px] py-[20px] text-center font-bold text-blue-400 min-w-[80px]">
                    {row.shortName}
                  </td>
                  <td className="px-[16px] py-[20px] text-center min-w-[80px]">
                    <div className="flex justify-center items-center">
                      <img
                        src={row.logo}
                        className="rounded-full object-cover w-10 h-10"
                        alt=""
                      />
                    </div>
                  </td>
                  <td className="px-[16px] py-[20px] text-center flex justify-center items-center font-bold text-green-400 min-w-[80px]">
                    <img
                      src={row.avatar}
                      className="object-cover w-28 h-10"
                      alt=""
                    />
                  </td>
                  <td className="px-[16px] py-[20px] text-center min-w-[80px] relative">
                    <FontAwesomeIcon
                      className="cursor-pointer text-xl p-2 text-gray-400"
                      icon={faEllipsis}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleMenuToggle(index);
                      }}
                    />
                    {selectedRow === index && (
                      <div
                        ref={menuRef}
                        className="absolute top-4 z-10 right-2 mt-8"
                      >
                        <div className="bg-[#efefef] rounded-2xl relative shadow-md shadow-gray-300 px-6 py-2 text-left">
                          <div className="relative">
                            <div className="absolute top-[-11px] right-[6px] transform -translate-x-1/2 bg-[#efefef] w-3 h-3 rotate-45"></div>
                          </div>
                          <button className=" flex gap-3 justify-center items-center hover:text-[#2a4c87] w-full text-left px-4 py-2 text-gray-700 ">
                            <FontAwesomeIcon
                              className="text-xl"
                              icon={faEdit}
                            />
                            <p className="font-bold">Edit</p>
                          </button>
                          <button
                            className="flex gap-3 justify-center hover:text-[#f45d5d] items-center w-full text-left px-4 py-2 text-red-600 "
                            onClick={() => clickDeletePokerTour(row._id)}
                          >
                            <FontAwesomeIcon
                              className="text-xl"
                              icon={faTrash}
                            />
                            <p className="font-bold">Delete</p>
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center pb-12 justify-center">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                className={`ml-2 px-3 py-1 text-sm rounded-md border focus:outline-none focus:ring focus:border-blue-300 ${
                  page === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700"
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            )
          )}
        </div>
      </div>

      {showDetailPokerTour && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-950 opacity-50"></div>
          <div className="bg-white w-[800px] h-auto relative z-30 shadow-xl rounded-lg p-6">
            <div className="absolute right-6 top-6">
              <FontAwesomeIcon
                onClick={() => setShowDetailPokerTour(false)}
                className="font-bold text-4xl text-gray-400 hover:text-red-400 cursor-pointer"
                icon={faXmark}
              />
            </div>
            <div className="">
              <h1 className="text-3xl font-bold text-blue-500">
                Details Information Poker Tour
              </h1>
            </div>
            <div className="px-8 pb-4 mt-8 flex gap-6">
              <div className="flex flex-col justify-start items-center w-[50%]">
                <div className="w-full flex-col flex gap-5">
                  <div className="flex flex-col w-full items-center">
                    <div
                      className={`rounded-full overflow-hidden w-48 h-48 border-4 ${
                        selectedLogoModal
                          ? "border-green-500"
                          : "border-gray-500"
                      }`}
                    >
                      {selectedLogoModal ? (
                        <img
                          src={selectedLogoModal}
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
                      htmlFor="image-input-modalLogo"
                      className="mt-4 px-4 py-2 bg-blue-500 text-base rounded-2xl text-white font-bold cursor-pointer custom-file-input"
                    >
                      Edit LOGO
                      <input
                        type="file"
                        id="image-input-modalLogo"
                        accept="image/*"
                        onChange={handleImageModalChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <InputAdmin
                    type="text"
                    value={namePokerTourModal}
                    onChange={handleNamePokerTourChangeModal}
                    label="Name Poker Tour"
                    // validate={(value) => /^[A-Za-z\s]+$/.test(namePlayer)}
                    placeholder="Enter poker tour name here"
                  />
                  <InputAdmin
                    type="text"
                    value={shortNameModal}
                    onChange={handleShortNameChangeModal}
                    label="Short Name"
                    // validate={(value) => /^[A-Za-z\s]+$/.test(namePlayer)}
                    placeholder="Enter initials here"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-start items-center w-[50%]">
                <div className="w-full flex-col flex gap-3">
                  <div className="flex flex-col w-full items-center">
                    <div
                      className={`rounded-2xl overflow-hidden w-72 h-48 border-4 ${
                        selectedAvatarModal
                          ? "border-green-500"
                          : "border-gray-500"
                      }`}
                    >
                      {selectedAvatarModal ? (
                        <img
                          src={selectedAvatarModal}
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
                      htmlFor="image-input-avtModal"
                      className="mt-4 px-4 py-2 bg-blue-500 text-base rounded-2xl text-white font-bold cursor-pointer custom-file-input"
                    >
                      Edit Avatar
                      <input
                        type="file"
                        id="image-input-avtModal"
                        accept="image/*"
                        onChange={handleAvartarModalChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <div className="container mx-auto my-4">
                  <h1 className="text-xl font-bold text-left">Description</h1>
                  <TextArea
                    value={descriptionModal}
                    onContentChange={handleContentChangeModal}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 pb-4 flex justify-center items-center w-[full] gap-6">
              <ButtonAdmin
                isFormComplete={isFormCompleteModal}
                color="blue"
                onClick={clickUpdatePokerTour}
              >
                Update Poker Tour
              </ButtonAdmin>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPokerTour;

import React from "react";
import "./AdminHome.css";

const AdminHome = () => {
  return (
    <div className="flex justify-center items-center h-screen rounded-2xl">
      <div className="bg-white shadow-lg rounded-lg p-6 transform transition-all duration-500 hover:scale-105">
        <h1 className="text-3xl font-bold text-yellow-800 mb-4 animate-pulse">
          Welcome, Admin!
        </h1>
        <p className="text-gray-600 mb-4">
          You have successfully logged in as an admin.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AdminHome;

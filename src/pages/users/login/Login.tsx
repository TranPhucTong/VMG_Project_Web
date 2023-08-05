import React, { useState } from "react";

const Login: React.FC<{ onLogin: (username: string, password: string) => void }> = ({
  onLogin,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = () => {
    onLogin(username, password);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLoginClick();
    }
  };

  return (
    <div className="max-w-sm mx-auto w-full mt-8 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Đăng nhập</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-1">Tên đăng nhập:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            onKeyPress={handleKeyPress} // Xử lý sự kiện nhấn phím Enter
            className="w-full px-2 py-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Mật khẩu:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            onKeyPress={handleKeyPress} // Xử lý sự kiện nhấn phím Enter
            className="w-full px-2 py-1 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="button"
          onClick={handleLoginClick}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Login;

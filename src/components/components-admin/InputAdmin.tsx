import React, { ChangeEvent, useState } from "react";

type Option = {
  value: string;
  label: string;
};

type InputProps = {
  type: "text" | "number" | "select" | "date";
  options?: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  label?: string;
  validate?: (value: string | number) => boolean;
};

const InputAdmin: React.FC<InputProps> = ({
  type,
  options,
  value,
  onChange,
  label,
  validate,
}) => {
  const inputId = `input-${Math.random().toString(36).substring(7)}`;
  const [touched, setTouched] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(type === "number" ? Number(newValue) : newValue);
    setTouched(true);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
    setTouched(true);
  };
  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
    setTouched(true);
  };

  const isError = touched && validate && !validate(value);

  return (
    <div className="flex flex-col justify-start">
      <label className="text-left text-xl text-gray-600" htmlFor={inputId}>
        {label}
      </label>
      {type === "text" && (
        <input
          className="px-4 py-1 border-gray-400 border rounded-xl"
          type="text"
          id={inputId}
          value={String(value)}
          onChange={handleInputChange}
          placeholder="Vui lòng nhập ở đây"
        />
      )}
      {type === "number" && (
        <input
          className="px-4 py-1 border-gray-400 border rounded-xl"
          type="number"
          id={inputId}
          value={String(value)}
          onChange={handleInputChange}
          placeholder="Vui lòng nhập ở đây"
        />
      )}
      {type === "select" && (
        <select
          className="px-4 py-1 border-gray-400 border rounded-xl"
          id={inputId}
          value={String(value)}
          onChange={handleSelectChange}
          placeholder="Vui lòng chọn ở đây"
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      {type === "date" && (
        <input
          className="px-4 py-1 border-gray-400 border rounded-xl"
          type="date"
          id={inputId}
          value={String(value)}
          onChange={handleDateChange}
        />
      )}
      {isError && <p style={{ color: "red" }}>Không hợp lệ</p>}
    </div>
  );
};

export default InputAdmin;

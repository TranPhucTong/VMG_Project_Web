import React, { ChangeEvent, useState } from 'react';
import flagVN from '../../images/flag-vn.png';
import flagUK from '../../images/flag-us.png';


interface LanguageData {
    code: string;
    name: string;
    flag: string;
  }
  
  const languageData: LanguageData[] = [
    { code: 'en', name: 'English', flag: flagUK },
    { code: 'vi', name: 'Tiếng Việt', flag: flagVN },
    // Thêm các ngôn ngữ và quốc kỳ tương ứng vào đây
  ];
  
  const LanguageSelect: React.FC = () => {
    const [language, setLanguage] = useState('en'); // Ngôn ngữ mặc định là tiếng Anh ('en')
  
    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setLanguage(event.target.value);
    };
  
    return (
      <div className="relative inline-block text-black">
        <select
          className="py-1 border rounded-md pl-10 pr-4 text-xl appearance-none"
          value={language}
          onChange={handleLanguageChange}
        >
          {languageData.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
          {languageData.map((lang) => (
            language === lang.code && (
              <img
                key={lang.code}
                className="w-6 h-6 object-cover rounded-full"
                src={lang.flag}
                alt="Selected Language"
              />
            )
          ))}
        </div>
      </div>
    );
  };
  
  export default LanguageSelect;
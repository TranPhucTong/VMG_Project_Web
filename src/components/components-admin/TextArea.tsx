// src/components/TextArea.tsx

import React, { useState, ChangeEvent } from 'react';

interface TextAreaProps {
  value: string;
  onContentChange: (content: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({value, onContentChange }) => {
  const [content, setContent] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    onContentChange(value);
  };

  return (
    <div className="flex flex-col w-full">
      <textarea
        className="w-full h-40 p-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 resize-none"
        placeholder="Enter description..."
        value={value}
        onChange={handleChange}
      />
      <p className="mt-2 text-sm text-gray-500">{`${content.length}/500`}</p>
    </div>
  );
};

export default TextArea;

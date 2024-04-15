import {useState} from 'react';
/* eslint-disable react/prop-types */
import { Input } from '@mui/base/Input';

const TextInput = ({ label ,templateData, setTempData }) => {
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
    if(label === "Caption"){
      setTempData({
        ...templateData,
        caption: {
          ...templateData.caption,
          text: e.target.value,
        },
      });
    }else{
      setTempData({
        ...templateData,
        cta: {
          ...templateData.cta,
          text: e.target.value,
        },
      });
    }
  };

  return (
    <div className="mt-4">
      <Input
        placeholder={ label }
        aria-label="Demo input"
        slotProps={{
        input: {
          className:
            'w-80 text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg border-2 border-slate-400',
        },
      }}
        value={text}
        onChange={handleTextChange}
      />
      
    </div>
  );
};

export default TextInput;

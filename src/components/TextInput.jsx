/* eslint-disable react/prop-types */
import { Input } from '@mui/base/Input';

const TextInput = ({ label ,templateData, setTempData }) => {

  const handleTextChange = (e) => {
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
    <div className="mt-4 relative z-0  px-2 w-full group">
      <label className="font-mono uppercase font-bold  text-[12px]  text-gray-900 dark:text-gray-300
      bg-white relative px-1 top-2 left-3 w-auto group-focus-within:text-red-600 ">
        {label}
      </label>
      <Input
        placeholder={ label }
        aria-label="Demo input"
        slotProps={{
        input: {
          className:
            'w-80 text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg border-2 border-slate-400',
        },
      }}
        value={ label === "Caption" ? templateData.caption.text : templateData.cta.text}
        onChange={handleTextChange}
      />
      
    </div>
  );
};

export default TextInput;

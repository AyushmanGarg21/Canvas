/* eslint-disable react/prop-types */
import React from 'react';
import { MuiColorInput } from 'mui-color-input'

const ColorPicker = ({ onChange }) => {
    const [value, setValue] = React.useState('#ffffff')

  const handleColorChange = (color) => {
    onChange(color);
    setValue(color);
  };

  return (
    <div className="color-picker">
      <MuiColorInput format="hex" value={value} onChange={handleColorChange} />
    </div>
  );
};

export default ColorPicker;

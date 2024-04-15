/* eslint-disable react/prop-types */

import { useState } from 'react';
import { List, ListItem, IconButton } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { SketchPicker } from 'react-color';
import ColorLensIcon from '@mui/icons-material/ColorLens';

const ColorPicker = ({ backgroundColor, setBackgroundColor }) => {
  const [recentColors, setRecentColors] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = (color) => {
    setBackgroundColor(color);
    if (!recentColors.includes(color)) {
      const updatedColors = [color, ...recentColors.slice(0, 4)];
      setRecentColors(updatedColors);
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row m-2 text-gray-500'>
        <ColorLensIcon />
          <p>Choose your color</p>
      </div>
      <div className="flex flex-row items-center">
      <List sx={{ display: 'flex', gap: 2 }}>
        {recentColors.map((color) => (
          <ListItem
            key={color}
            onClick={() => handleColorChange(color)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              backgroundColor: backgroundColor === color ? '#08289c' : 'transparent',
              borderRadius: '50%',
              padding: 0,
              zIndex: 100,
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                backgroundColor: color,
                width: 24,
                height: 24,
                borderRadius: '50%',
              }}
            />
          </ListItem>
        ))}
      </List>
      <div className="flex justify-center items-center ml-4">
        <IconButton
          variant="outlined"
          style={{ width: 48, height: 48, borderRadius: '50%' }}
          onClick={() => setShowPicker(!showPicker)}
        >
          <AddCircleRoundedIcon fontSize="large" />
        </IconButton>
      </div>
      {showPicker && (
        <div className="absolute z-10 mb-96 ml-5">
          <SketchPicker
            color={backgroundColor}
            onChange={(color) => handleColorChange(color.hex)}
          />
        </div>
      )}
    </div>
    </div>
    
  );
};

export default ColorPicker;

/* eslint-disable react/prop-types */

import { useState } from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { SketchPicker } from 'react-color';
import ColorLensIcon from '@mui/icons-material/ColorLens';

const ColorPicker = ({ onChange }) => {
  const [currentColor, setCurrentColor] = useState("#ffffff");
  const [recentColors, setRecentColors] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = (color) => {
    // Update current color and add to recent colors
    setCurrentColor(color);
    setRecentColors((prevColors) => {
      const updatedColors = [color, ...prevColors.slice(0, 4)]; // Keep up to 5 recent colors
      return updatedColors.filter((c, index, self) => self.indexOf(c) === index); // Remove duplicates
    });
    onChange(color);
  };

  return (
    <div className="flex flex-row">
        <List className="flex">
        <ColorLensIcon fontSize="large"/>
          {recentColors.map((color) => (
            <ListItem sx={{
              display: 'flex',
            }}
              key={color}
              onClick={() => handleColorChange(color)}
            >
              <ListItemText primary={<div style={{ backgroundColor: color, width: 24, height: 24, borderRadius: '50%', marginRight: 4 }} />} />
            </ListItem>
          ))}
        </List>
        <div className="flex justify-center items-center flex-end">
          <IconButton
            variant="outlined"
            style={{width: 50, height: 50, borderRadius: '50%', marginRight: 8 }}
            onClick={() => setShowPicker(!showPicker)}
          >
          <AddCircleRoundedIcon fontSize="large"/>
          </IconButton>
        </div>
        {/* <MuiColorInput format="hex" value={currentColor} onChange={handleColorChange} /> */}
        {showPicker && (
          <div className="absolute z-10 m-12">
            <SketchPicker color={currentColor} onChange={(color) => handleColorChange(color.hex)} />
          </div>
        )}
    </div>
  );
};

export default ColorPicker;

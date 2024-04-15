/* eslint-disable react/prop-types */
import { useRef } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {Box} from '@mui/material';

const ImagePicker = ({ onImageChange }) => {
  const fileInputRef = useRef(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageDataUrl = event.target.result;
        onImageChange(imageDataUrl);
        //console.log(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <div className='flex items-center'>
        <Box
          component="span"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
            width: '80%',
            height: '100%',
            border: '2px solid #0369A1',
            borderRadius: '8px',
            cursor: 'pointer',
            padding: '5px',
            color: '#0369A1',
          }}
          onClick={() => fileInputRef.current.click()}
        >
            
          <AddPhotoAlternateIcon/>
          select image
        </Box>
      </div>
    </div>
  );
};

export default ImagePicker;

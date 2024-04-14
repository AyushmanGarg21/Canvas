import { useState } from 'react'
import './App.css'
import Canvas from './components/Canvas'
import ColorPicker from './components/ColorPicker';
import TextInput from './components/TextInput';

const App = () => {
  const templateData = {
    caption: {
      text: '1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs',
      position: { x: 50, y: 50 },
      font_size: 44,
      text_color: '#FFFFFF',
      max_characters_per_line: 31,
    },
    cta: {
      text: 'Shop Now',
      position: { x: 190, y: 320 },
      text_color: '#FFFFFF',
      background_color: '#000000',
    },
    image_mask: { x: 56, y: 442, width: 970, height: 600 },
    urls: {
      mask: 'https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_mask.png',
      stroke: 'https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Mask_stroke.png',
      design_pattern: 'https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Design_Pattern.png',
    },
  };

  const [backgroundColor, setBackgroundColor] = useState('#0369A1');

  const handleColorChange = (color) => {
    setBackgroundColor(color.hex);
  };

  return (
    <div className="flex flex-row">
    <div>
      <Canvas templateData={templateData} backgroundColor={backgroundColor} />
    </div>
    <div>
      <div className='flex flex-col item-center'>
        <h1 className="text-4xl font-bold text-center">Ad Customization</h1>
        <p className="text-center">Customize your image</p>
      </div>
      <div className='flex flex-col'>
          {/*image select */}
      </div>
      <div className='line'>
        Edit contents
      </div>
      <div className='flex flex-col'>
          <TextInput label="Caption" />
          <TextInput label="CTA" />
          <ColorPicker onChange={handleColorChange} />
      </div>
    </div> 
    </div>
  );
};

export default App;

import { useState } from 'react'
import './App.css'
import Canvas from './components/Canvas'
import ColorPicker from './components/ColorPicker';
import TextInput from './components/TextInput';
import ImagePicker from './components/ImagePicker';
import maskImage from  './assets/global_temp_landscape_temp_10_mask.png';
import strokeImage from  './assets/global_temp_landscape_temp_10_Mask_stroke.png';
import designPatternImage from  './assets/global_temp_landscape_temp_10_Design_Pattern.png';

const App = () => {
  const SampleTemplateData = {
    caption: {
      text: '1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs',
      position: { x: 100, y: 100 },
      font_size: 44,
      alignment:"left",
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
      mask: maskImage,
      stroke: strokeImage,
      design_pattern: designPatternImage,
    },
  };

  const [templateData , setTempData] = useState(SampleTemplateData);
  const [backgroundColor, setBackgroundColor] = useState('#0369A1');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (imageDataUrl) => {
    setSelectedImage(imageDataUrl);
  };
  
  return (
    <div className="flex flex-row flex-wrap wide gap-10">
    <div className="flex flex-1 w-64 items-center justify-center back-pattren">
    <div>
        <Canvas templateData={templateData} backgroundColor={backgroundColor} selectedImage = {selectedImage} />
    </div>
    </div>

    <div className="flex flex-1 flex-col w-64 justify-start gap-5">
      <div className='flex flex-col justify-start gap-2 mt-10'>
        <h1 className="text-4xl font-bold text-center">Ad Customization</h1>
        <p className="text-center text-slate-400">Customize your ad and get the templates accordingly</p>
      </div>
      <div className='flex flex-col'>
          <ImagePicker onImageChange={handleImageChange} />
      </div>
      <div className="flex flex row items-center">
        <div className='line'></div>
        <span className="text-gray-500 w-56">Edit Contents</span>
        <div className='line'></div>
      </div>
      <div className='flex flex-col gap-1'>
          <TextInput label="Caption" templateData={templateData}  setTempData={setTempData}/>
          <TextInput label="CTA" templateData={templateData} setTempData={setTempData}/>
          <ColorPicker backgroundColor = {backgroundColor} setBackgroundColor={setBackgroundColor}/>
      </div>
    </div> 
    </div>
  );
};

export default App;

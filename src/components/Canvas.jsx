/* eslint-disable react/prop-types */

import { useEffect, useRef } from 'react';

const Canvas = ({ templateData, backgroundColor , selectedImage }) => {

  const canvasRef = useRef(null);

  useEffect(() => {

    const fetchData = async () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await renderImage(ctx, templateData.urls.design_pattern);
      await renderImage(ctx, templateData.urls.mask);
      await renderImage(ctx, templateData.urls.stroke);
      await renderSelectedImage(ctx, selectedImage, templateData.image_mask);
      renderCaption(ctx, templateData.caption);
      renderCTA(ctx, templateData.cta);
    };

    fetchData();
  }, [backgroundColor, selectedImage,templateData]);

  // useEffect(() => {
  //     const canvas = canvasRef.current;
  //     const ctx = canvas.getContext('2d');
  //     renderCaption(ctx, templateData.caption);
  //     renderCTA(ctx, templateData.cta);
  // }, [backgroundColor, templateData, selectedImage]);

  const renderImage = async (ctx, imageUrl) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
        resolve();
      };
      img.onerror = (error) => {
        reject(error);
      };
    });
  };

  const renderSelectedImage = async (ctx, image, maskData) => {
    return new Promise((resolve, reject) => {
      if (!image) {
        resolve();
        return;
      }
      const { x, y, width, height } = maskData;
      const img = new Image();
      img.src = image;
      img.onload = () => {
        ctx.save();
        ctx.globalCompositeOperation='source-over';
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.clip();
        ctx.drawImage(img, x, y, width, height);
        ctx.restore();
        resolve();
      };
      img.onerror = (error) => {
        reject(error);
      };
    });
  };
  

  const renderCaption = (ctx, captionData) => {
    const { text, position, font_size, alignment, text_color, max_characters_per_line } = captionData;
    
    ctx.fillStyle = text_color;
    ctx.font = `${font_size}px Arial`;
    ctx.textAlign = alignment;

    const lines = wrapText(text, max_characters_per_line);
    
    lines.forEach((line, index) => {
      ctx.fillText(line, position.x, position.y + index *(font_size+15) );
    });
  };

  const renderCTA = (ctx, ctaData) => {
    const { text, position, font_size = 30, text_color, background_color, wrap_length = 20 } = ctaData;
    
    // Calculate text width and height
    ctx.font = `${font_size}px Arial`;
    const textWidth = ctx.measureText(text).width;
    const textHeight = font_size;

    // Draw rounded rectangle background for CTA
    ctx.fillStyle = background_color;
    ctx.strokeStyle = text_color;
    const padding = 24;
    const rectWidth = textWidth + 2 * padding;
    const rectHeight = textHeight + 2 * padding;
    const rectX = position.x - rectWidth / 2;
    const rectY = position.y - rectHeight / 2;

    ctx.beginPath();
    ctx.moveTo(rectX+10, rectY);
    ctx.arcTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + rectHeight, 20);
    ctx.arcTo(rectX + rectWidth, rectY + rectHeight, rectX, rectY + rectHeight, 20);
    ctx.arcTo(rectX, rectY + rectHeight, rectX, rectY, 20);
    ctx.arcTo(rectX, rectY, rectX + rectWidth, rectY, 20);
    ctx.closePath();

    ctx.fill();

    // Draw CTA text
    ctx.fillStyle = text_color;
    ctx.font = `${font_size}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, position.x, position.y);
  };


  const wrapText = (text, maxCharactersPerLine) => {
    const words = text.split(' ');
    let line = '';
    const lines = [];
    for (let word of words) {
      const testLine = line + word + ' ';
      if (testLine.length > maxCharactersPerLine) {
        lines.push(line);
        line = word + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line);
    return lines;
  };

  

  return (
    <canvas
      ref={canvasRef}
      width={1080}
      height={1080}
      style={{ width: '100%',height: '100%',
      maxWidth:'400px',maxHeight:'400px',
      minHeight:'250px',minWidth:'250px',
      border: '1px solid black' }}
    />
  );
};

export default Canvas;

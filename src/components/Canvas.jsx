// src/components/Canvas.js
/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';

const Canvas = ({ templateData }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background color
    ctx.fillStyle = '#0369A1'; // Default blue background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw design pattern
    const designPatternImg = new Image();
    designPatternImg.src = templateData.urls.design_pattern;
    designPatternImg.onload = () => {
      ctx.drawImage(designPatternImg, 0, 0, canvas.width, canvas.height);
    };

    // Draw mask
    const maskImg = new Image();
    maskImg.src = templateData.urls.mask;
    maskImg.onload = () => {
      ctx.globalCompositeOperation = 'source-in';
      ctx.drawImage(maskImg, templateData.image_mask.x, templateData.image_mask.y, templateData.image_mask.width, templateData.image_mask.height);
    };

    // Draw mask stroke
    const strokeImg = new Image();
    strokeImg.src = templateData.urls.stroke;
    strokeImg.onload = () => {
      ctx.globalCompositeOperation = 'destination-over';
      ctx.drawImage(strokeImg, templateData.image_mask.x, templateData.image_mask.y, templateData.image_mask.width, templateData.image_mask.height);
    };

    // Draw caption text
    ctx.globalCompositeOperation = 'source-over'; // Reset global composite operation
    ctx.fillStyle = templateData.caption.text_color;
    ctx.font = `${templateData.caption.font_size}px Arial`;
    wrapText(ctx, templateData.caption.text, templateData.caption.position.x, templateData.caption.position.y, 500, templateData.caption.max_characters_per_line);

    // Draw CTA text
    const ctaX = templateData.cta.position.x;
    const ctaY = templateData.cta.position.y;
    const ctaWidth = ctx.measureText(templateData.cta.text).width + 48;
    const ctaHeight = templateData.cta.font_size + 48;
    const ctaXStart = ctaX - ctaWidth / 2;
    const ctaYStart = ctaY - ctaHeight / 2;

    ctx.fillStyle = templateData.cta.background_color;
    roundRect(ctx, ctaXStart, ctaYStart, ctaWidth, ctaHeight, 10, true);
    ctx.fillStyle = templateData.cta.text_color;
    ctx.font = `${templateData.cta.font_size}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(templateData.cta.text, ctaX, ctaY);
  }, [templateData]);

  const wrapText = (ctx, text, x, y, maxWidth, maxCharsPerLine) => {
    let words = text.split(' ');
    let line = '';
    let yPos = y;
    for (let word of words) {
      let testLine = line + word + ' ';
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxWidth || word === '\n') {
        ctx.fillText(line.trim(), x, yPos);
        line = word + ' ';
        yPos += templateData.caption.font_size;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, yPos);
  };

  const roundRect = (ctx, x, y, width, height, radius, fill) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={1080}
      height={1080}
      style={{ width: '400px', height: '400px', border: '1px solid black' }}
    />
  );
};

export default Canvas;

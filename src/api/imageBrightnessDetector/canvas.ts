import type { ImageBrightnessDetector } from './common';

export const calculateImageBrightness: ImageBrightnessDetector = async (image: HTMLImageElement): Promise<number> => {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;

  const ctx = canvas.getContext('2d');

  if (ctx === null) {
    console.warn('Could not create 2d context');

    return 0;
  }

  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  let colorSum = 0;

  for (let x = 0; x < data.length; x += 4) {
    const r = data[x] ?? 0;
    const g = data[x + 1] ?? 0;
    const b = data[x + 2] ?? 0;

    const avg = Math.floor((r + g + b) / 3);

    colorSum += avg;
  }

  const brightness = Math.floor(colorSum / (image.width * image.height));

  return brightness / 255;
};

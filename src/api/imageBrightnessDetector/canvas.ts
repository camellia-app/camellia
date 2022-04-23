import type { ImageBrightnessDetector } from './common';

export const calculateImageBrightness: ImageBrightnessDetector = async (image: HTMLImageElement): Promise<number> => {
  let colorSum = 0;

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

  let r = 0;
  let g = 0;
  let b = 0;
  let avg = 0;

  for (let x = 0, len = data.length; x < len; x += 4) {
    r = data[x] ?? 0;
    g = data[x + 1] ?? 0;
    b = data[x + 2] ?? 0;

    avg = Math.floor((r + g + b) / 3);
    colorSum += avg;
  }

  return Math.floor(colorSum / (image.width * image.height));
};

import { createContext } from 'react';

export const BackgroundMediaBrightnessContext = createContext({
  brightness: 0.75,
  setBrightness: (brightness: number): void => {
    throw new Error(`There was an attempt to set background image brightness to ${brightness} outside context`);
  },
});

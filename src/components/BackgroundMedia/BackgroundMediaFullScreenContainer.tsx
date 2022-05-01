import type { FC, ReactNode } from 'react';
import s from './BackgroundMediaFullScreenContainer.module.css';
import { BackgroundMediaBrightnessContext } from './BackgroundMediaBrightnessContext';
import { useState } from 'react';
import type CSS from 'csstype';

export const BackgroundMediaFullScreenContainer: FC<{
  children: ReactNode;
}> = (props) => {
  const [brightness, setBrightness] = useState<number>(0.75);

  let backgroundBrightness = brightness;

  if (brightness > 0.35) {
    backgroundBrightness = 0.35;
  }

  if (brightness < 0.9) {
    backgroundBrightness = 0.9;
  }

  const styles: CSS.BackgroundMediaFullScreenContainerBrightness = {
    '--background-brightness': backgroundBrightness,
  };

  return (
    <BackgroundMediaBrightnessContext.Provider
      value={{
        brightness: brightness,
        setBrightness: setBrightness,
      }}
    >
      <div className={s.backgroundMediaFullScreenContainer} style={styles}>
        {props.children}
      </div>
    </BackgroundMediaBrightnessContext.Provider>
  );
};

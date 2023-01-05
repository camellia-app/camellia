import type CSS from 'csstype';
import type { FC, ReactNode } from 'react';
import { useOption } from '../../../api/options/hook';
import { BackgroundBrightnessType } from '../../../api/options/options';
import {
  backgroundMediaFullScreenContainer,
  backgroundMediaFullScreenContainerBackdrop,
} from './BackgroundMediaFullScreenContainer.module.css';

export const BackgroundMediaFullScreenContainer: FC<{
  children: ReactNode;
  forceBrightness?: number | undefined;
}> = (props) => {
  const [backgroundBrightness] = useOption('background_brightness');

  let brightness = 0;

  if (props.forceBrightness === undefined) {
    switch (backgroundBrightness) {
      case BackgroundBrightnessType.Bright:
        brightness = 100;

        break;

      case BackgroundBrightnessType.ReducedBrightness:
        brightness = 50;

        break;

      default:
        brightness = 0;
    }
  } else {
    brightness = props.forceBrightness;
  }

  const styles: CSS.Background = {
    '--background-color': `hsl(0deg 0% 0% / ${100 - brightness}%)`,
  };

  return (
    <div className={backgroundMediaFullScreenContainer}>
      <div className={backgroundMediaFullScreenContainerBackdrop} style={styles} />

      {props.children}
    </div>
  );
};

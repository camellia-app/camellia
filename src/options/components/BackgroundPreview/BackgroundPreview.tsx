import type { FC } from 'react';
import type CSS from 'csstype';
import s from './BackgroundPreview.module.css';
import { BackgroundMedia } from '../../../components/BackgroundMedia/BackgroundMedia';

export const BackgroundPreview: FC = () => {
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  const styles: CSS.BackgroundPreviewProperties = {
    ['--screen-width']: screenWidth.toString(),
    ['--screen-height']: screenHeight.toString(),
  };

  return (
    <div className={s.backgroundPreview} style={styles}>
      <BackgroundMedia />
    </div>
  );
};

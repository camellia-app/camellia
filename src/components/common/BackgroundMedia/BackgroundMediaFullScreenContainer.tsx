import type { FC, ReactNode } from 'react';
import {
  backgroundMediaFullScreenContainer,
  backgroundMediaFullScreenContainerBackdrop,
} from './BackgroundMediaFullScreenContainer.module.css';

export const BackgroundMediaFullScreenContainer: FC<{
  children: ReactNode;
}> = (props) => {
  return (
    <div className={backgroundMediaFullScreenContainer}>
      <div className={backgroundMediaFullScreenContainerBackdrop} />

      {props.children}
    </div>
  );
};

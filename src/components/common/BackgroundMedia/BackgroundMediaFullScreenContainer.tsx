import type { FC, ReactNode } from 'react';
import { backgroundMediaFullScreenContainer } from './BackgroundMediaFullScreenContainer.module.css';

export const BackgroundMediaFullScreenContainer: FC<{
  children: ReactNode;
}> = (props) => {
  return <div className={backgroundMediaFullScreenContainer}>{props.children}</div>;
};

import type { FC, ReactNode } from 'react';
import s from './BackgroundMediaFullScreenContainer.module.css';

export const BackgroundMediaFullScreenContainer: FC<{
  children: ReactNode;
}> = (props) => {
  return <div className={s.backgroundMediaFullScreenContainer}>{props.children}</div>;
};

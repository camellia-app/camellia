import type { FC, ReactNode } from 'react';
import s from './Paragraph.module.css';

export const Paragraph: FC<{ children: ReactNode }> = (props) => {
  return <p className={s.paragraph}>{props.children}</p>;
};

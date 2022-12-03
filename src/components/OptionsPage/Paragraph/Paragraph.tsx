import type { FC, ReactNode } from 'react';
import { paragraph } from './Paragraph.module.css';

export const Paragraph: FC<{ children: ReactNode }> = (props) => {
  return <p className={paragraph}>{props.children}</p>;
};

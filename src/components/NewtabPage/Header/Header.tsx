import type { FC, ReactNode } from 'react';
import { header } from './Header.module.css';

export const Header: FC<{
  children: ReactNode;
  level: 1 | 2 | 3 | 4 | 5;
}> = (props) => {
  switch (props.level) {
    case 1:
      return <h1 className={header}>{props.children}</h1>;
    case 2:
      return <h2 className={header}>{props.children}</h2>;
    case 3:
      return <h3 className={header}>{props.children}</h3>;
    case 4:
      return <h4 className={header}>{props.children}</h4>;
    case 5:
      return <h5 className={header}>{props.children}</h5>;
    default:
      throw new Error(`Unknown header level: ${props.level}`);
  }
};

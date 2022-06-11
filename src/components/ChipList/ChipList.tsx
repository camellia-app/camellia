import type { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { chipList, chipListColumns, chipListInline, chipListItem } from './ChipList.module.css';

export const ChipList: FC<{
  chips: Array<ReactNode>;
  type: 'columns' | 'inline';
}> = (props) => (
  <ul
    className={classNames(chipList, {
      [chipListInline]: props.type === 'inline',
      [chipListColumns]: props.type === 'columns',
    })}
  >
    {props.chips.map((chip, index) => {
      return (
        <li className={chipListItem} key={index}>
          {chip}
        </li>
      );
    })}
  </ul>
);

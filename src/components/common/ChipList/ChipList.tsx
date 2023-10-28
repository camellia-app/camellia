import type { FC, ReactNode } from 'react';

import { clsx } from 'clsx';

import {
  chipList,
  chipListColumns,
  chipListInline,
  chipListItem,
  chipListMoveLastChipToRight,
} from './ChipList.module.css';

export const ChipList: FC<{
  chips: Array<ReactNode>;
  /**
   * Should last chip be moved to the opposite side of the list (to the right).
   * Works only if `type` is `inline`.
   *
   * @default false
   */
  moveLastChipToRight?: boolean | undefined;
  type: 'columns' | 'inline';
}> = (props) => (
  <ul
    className={clsx(chipList, {
      [chipListColumns]: props.type === 'columns',
      [chipListInline]: props.type === 'inline',
      [chipListMoveLastChipToRight]: props.type === 'inline' && props.moveLastChipToRight === true,
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

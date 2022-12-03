import classNames from 'classnames';
import type { FC, ReactNode } from 'react';
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
    className={classNames(chipList, {
      [chipListInline]: props.type === 'inline',
      [chipListColumns]: props.type === 'columns',
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

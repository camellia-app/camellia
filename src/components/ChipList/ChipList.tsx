import type { FC, ReactNode } from 'react';
import classNames from 'classnames';
import ChipListModuleCssModule from './ChipList.module.css';

export const ChipList: FC<{
  chips: Array<ReactNode>;
  type: 'columns' | 'inline';
}> = (props) => (
  <ul
    className={classNames(ChipListModuleCssModule.chipList, {
      [ChipListModuleCssModule.chipListInline]: props.type === 'inline',
      [ChipListModuleCssModule.chipListColumns]: props.type === 'columns',
    })}
  >
    {props.chips.map((chip, index) => {
      return (
        <li className={ChipListModuleCssModule.chipListItem} key={index}>
          {chip}
        </li>
      );
    })}
  </ul>
);

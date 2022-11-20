import type { FC, ReactNode } from 'react';
import { optionsCategoryButton, optionsCategoryIcon, optionsCategoryLabel } from './OptionsCategory.module.css';

export const OptionsCategory: FC<{
  icon: ReactNode;
  id: string;
  isActive: boolean;
  label: string;
  onClick: (id: string) => void;
}> = (props) => {
  return (
    <label>
      <input
        checked={props.isActive}
        name="options-category"
        onChange={(): void => props.onClick(props.id)}
        type="radio"
        value={props.label}
      />

      <div className={optionsCategoryButton}>
        <div className={optionsCategoryIcon}>{props.icon}</div>

        <span className={optionsCategoryLabel}>{props.label}</span>
      </div>
    </label>
  );
};

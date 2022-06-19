import type CSS from 'csstype';
import type { FC } from 'react';
import type { Icon } from '../../../../icons';
import { optionsCategoryButton, optionsCategoryIcon, optionsCategoryLabel } from './OptionsCategory.module.css';

export const OptionsCategory: FC<{
  icon: Icon;
  id: string;
  isActive: boolean;
  label: string;
  onClick: (id: string) => void;
}> = (props) => {
  const styles: CSS.OptionsNavigationLinkProperties = {
    ['--inline-icon']: `url("${props.icon}")`,
  };

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
        <span className={optionsCategoryIcon} style={styles} />
        <span className={optionsCategoryLabel}>{props.label}</span>
      </div>
    </label>
  );
};

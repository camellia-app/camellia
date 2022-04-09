import s from './OptionsCategory.module.css';
import type { VoidFunctionComponent } from 'react';
import type CSS from 'csstype';
import type { Icon } from '../../../../icons';

type OptionsCategoryProps = {
  icon: Icon;
  id: string;
  isActive: boolean;
  label: string;
  onClick: (id: string) => void;
};

export const OptionsCategory: VoidFunctionComponent<OptionsCategoryProps> = (props) => {
  const styles: CSS.OptionsNavigationLinkProperties = {
    ['--inline-icon']: `url("${props.icon}")`,
  };

  return (
    <label className={s.optionsCategory}>
      <input
        checked={props.isActive}
        name="options-category"
        onChange={(): void => props.onClick(props.id)}
        type="radio"
        value={props.label}
      />

      <div className={s.optionsCategoryButton}>
        <span className={s.optionsCategoryIcon} style={styles} />
        <span className={s.optionsCategoryLabel}>{props.label}</span>
      </div>
    </label>
  );
};

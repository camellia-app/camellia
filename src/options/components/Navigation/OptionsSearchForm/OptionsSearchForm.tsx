import s from './OptionsSearchForm.module.css';
import type { VoidFunctionComponent } from 'react';
import { OptionsCategory } from '../OptionsCategory/OptionsCategory';
import { allCategories } from '../OptionsCategory/OptionsCategories';
import { Icon } from '../../../../icons';

type Props = {
  activeCategory: string | undefined;
  onCategoryChange: (id: string) => void;
  onCategoryReset: () => void;
};

export const OptionsSearchForm: VoidFunctionComponent<Props> = (props) => {
  return (
    <form className={s.optionsSearchForm} onSubmit={(event): void => event.preventDefault()}>
      <fieldset className={s.optionsSearchFormFieldGroup}>
        <ul className={s.optionsSearchFormCategoryList}>
          <li className={s.optionsSearchFormCategoryListItem}>
            <OptionsCategory
              icon={Icon.ViewList}
              id="all"
              isActive={props.activeCategory === undefined}
              label="All options"
              onClick={props.onCategoryReset}
            />
          </li>

          {allCategories.map((category) => (
            <li className={s.optionsSearchFormCategoryListItem} key={category.id}>
              <OptionsCategory
                icon={category.icon}
                id={category.id}
                isActive={category.id === props.activeCategory}
                label={category.label}
                onClick={props.onCategoryChange}
              />
            </li>
          ))}
        </ul>
      </fieldset>
    </form>
  );
};

import type { FC } from 'react';
import { t } from '../../../../api/i18n/translate';
import { Icon } from '../../../../icons';
import { allCategories } from '../OptionsCategory/OptionsCategories';
import { OptionsCategory } from '../OptionsCategory/OptionsCategory';
import { optionsSearchFormCategoryList } from './OptionsSearchForm.module.css';

export const OptionsSearchForm: FC<{
  activeCategory: string | undefined;
  onCategoryChange: (id: string) => void;
  onCategoryReset: () => void;
}> = (props) => {
  return (
    <form onSubmit={(event): void => event.preventDefault()}>
      <fieldset>
        <ul className={optionsSearchFormCategoryList}>
          <li>
            <OptionsCategory
              icon={Icon.ViewList}
              id="all"
              isActive={props.activeCategory === undefined}
              label={t('optionsNavigationCategory_allOptions_label')}
              onClick={props.onCategoryReset}
            />
          </li>

          {allCategories.map((category) => (
            <li key={category.id}>
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

import type { FC, ReactNode } from 'react';
import { useContext } from 'react';
import { ActiveOptionCategory } from '../../ActiveOptionCategoryContext';
import type { OptionCategory } from '../Navigation/OptionsCategory/OptionsCategories';

export const CategorizedOption: FC<{
  categories: Array<OptionCategory>;
  children: ReactNode;
}> = (props) => {
  const activeCategory = useContext(ActiveOptionCategory);

  if (
    activeCategory === undefined ||
    props.categories.find((category) => category.id === activeCategory) !== undefined
  ) {
    return <>{props.children}</>;
  }

  return <></>;
};

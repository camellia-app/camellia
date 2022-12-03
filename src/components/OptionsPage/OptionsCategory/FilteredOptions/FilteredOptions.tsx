import type { FC, ReactNode } from 'react';
import { useOptionFilters } from '../../../../store/hooks/useOptionFiltersHook';
import type { OptionCategory } from '../OptionsSearchForm/OptionsSearchForm';

export const FilteredOptions: FC<{
  categories: Array<OptionCategory>;
  children: ReactNode;
}> = (props) => {
  const [activeOptionCategory] = useOptionFilters();

  const isVisible =
    activeOptionCategory === undefined ||
    props.categories.find((category) => category.id === activeOptionCategory) !== undefined;

  return <div hidden={!isVisible}>{props.children}</div>;
};

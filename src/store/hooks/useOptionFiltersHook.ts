import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../index';
import type { OptionFiltersState } from '../slice/optionFiltersSlice';

import { optionFiltersSlice } from '../slice/optionFiltersSlice';

type ActiveOptionCategory = string | undefined;
type Dispatch = (newValue: ActiveOptionCategory) => void;

export const useOptionFilters = (): [ActiveOptionCategory, Dispatch] => {
  const activeOptionCategoryState = useSelector<RootState, OptionFiltersState>((state) => state.activeOptionCategory);

  const dispatch = useDispatch();

  return [
    activeOptionCategoryState.activeCategoryId,
    (newValue: ActiveOptionCategory): void => {
      dispatch(optionFiltersSlice.actions.changeCategory(newValue));
    },
  ];
};

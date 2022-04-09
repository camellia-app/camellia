import { createContext } from 'react';

type ActiveOptionCategoryContext = string | undefined;

export const ActiveOptionCategory = createContext<ActiveOptionCategoryContext>(undefined);

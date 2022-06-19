import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/store';

export const withProvider = (story: () => ReactNode): ReactNode => <Provider store={store}>{story()}</Provider>;

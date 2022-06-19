import { Provider } from 'react-redux';
import type { ReactNode } from 'react';
import { store } from '../src/store';

export const withProvider = (story: () => ReactNode): ReactNode => <Provider store={store}>{story()}</Provider>;

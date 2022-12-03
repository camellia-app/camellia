import * as Sentry from '@sentry/react';
import type { FC } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { AppPlatform, getPlatform } from '../../api/appEnvironment';
import { initializeSentry } from '../../api/utils/sentry';
import { store } from '../../store';
import { BackgroundMedia } from '../common/BackgroundMedia/BackgroundMedia';
import { BackgroundMediaFullScreenContainer } from '../common/BackgroundMedia/BackgroundMediaFullScreenContainer';
import { BookmarkWorkspace } from './BookmarkWorkspace/BookmarkWorkspace';
import { BottomToolbar } from './BottomToolbar/BottomToolbar';
import { newtabWrapper } from './NewtabPage.module.css';
import { PopupManager } from './Popup/PopupManager/PopupManager';

initializeSentry();

if (getPlatform() === AppPlatform.Web) {
  await import('../../backgroundScript/background');
}

export const NewtabPage: FC = () => {
  return (
    <StrictMode>
      <div className={newtabWrapper}>
        <Provider store={store}>
          <BookmarkWorkspace />
          <BottomToolbar />
          <PopupManager />

          <BackgroundMediaFullScreenContainer>
            <BackgroundMedia />
          </BackgroundMediaFullScreenContainer>
        </Provider>
      </div>
    </StrictMode>
  );
};

const root = document.getElementById('root');

if (root !== null) {
  const NewtabProfiled = Sentry.withProfiler(NewtabPage);

  createRoot(root).render(<NewtabProfiled />);
}

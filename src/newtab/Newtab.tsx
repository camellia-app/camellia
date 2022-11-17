import * as Sentry from '@sentry/react';
import type { FC } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { AppPlatform, getPlatform } from '../api/appEnvironment';
import { initializeSentry } from '../api/utils/sentry';
import { BackgroundMedia } from '../components/BackgroundMedia/BackgroundMedia';
import { BackgroundMediaFullScreenContainer } from '../components/BackgroundMedia/BackgroundMediaFullScreenContainer';
import { BookmarkWorkspace } from '../components/BookmarkWorkspace/BookmarkWorkspace';
import { BottomToolbar } from '../components/BottomToolbar/BottomToolbar';
import { PopupManager } from '../components/Popup/PopupManager/PopupManager';
import { store } from '../store';
import { newtabWrapper } from './Newtab.module.css';

initializeSentry();

if (getPlatform() === AppPlatform.Web) {
  await import('../backgroundScript/background');
}

export const Newtab: FC = () => {
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
  const NewtabProfiled = Sentry.withProfiler(Newtab);

  createRoot(root).render(<NewtabProfiled />);
}

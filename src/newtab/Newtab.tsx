import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import type { FC } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { AppPlatform, getPlatform } from '../api/appEnvironment';
import { BackgroundMedia } from '../components/BackgroundMedia/BackgroundMedia';
import { BackgroundMediaFullScreenContainer } from '../components/BackgroundMedia/BackgroundMediaFullScreenContainer';
import { BookmarkWorkspace } from '../components/BookmarkWorkspace/BookmarkWorkspace';
import { BottomToolbar } from '../components/BottomToolbar/BottomToolbar';
import { PopupManager } from '../components/Popup/PopupManager/PopupManager';
import { config } from '../config';
import { store } from '../store';
import { newtabWrapper } from './Newtab.module.css';

if (config.sentry.dsn !== undefined) {
  Sentry.init({
    dsn: config.sentry.dsn,
    integrations: [new BrowserTracing()],
    tracesSampleRate: config.sentry.tracing.sampleRate,
    environment: config.sentry.environment,
    release: config.appVersion,
  });
}

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
  createRoot(root).render(<Newtab />);
}

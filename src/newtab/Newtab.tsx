import { BackgroundMedia } from '../components/BackgroundMedia/BackgroundMedia';
import { BottomToolbar } from '../components/BottomToolbar/BottomToolbar';
import type { FC } from 'react';
import { Provider } from 'react-redux';
import { BookmarkWorkspace } from '../components/BookmarkWorkspace/BookmarkWorkspace';
import { BackgroundMediaFullScreenContainer } from '../components/BackgroundMedia/BackgroundMediaFullScreenContainer';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { store } from '../store';
import { PopupManager } from '../components/Popup/PopupManager/PopupManager';
import { newtabWrapper } from './Newtab.module.css';

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

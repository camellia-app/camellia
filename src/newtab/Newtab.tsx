import { BackgroundMedia } from '../components/BackgroundMedia/BackgroundMedia';
import { BottomToolbar } from '../components/BottomToolbar/BottomToolbar';
import type { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { BookmarkWorkspace } from '../components/BookmarkWorkspace/BookmarkWorkspace';
import { BackgroundMediaFullScreenContainer } from '../components/BackgroundMedia/BackgroundMediaFullScreenContainer';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import s from './Newtab.module.css';

export const Newtab: FC = () => {
  return (
    <StrictMode>
      <div className={s.newtabWrapper}>
        <Provider store={store}>
          <BookmarkWorkspace />
          <BottomToolbar />
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

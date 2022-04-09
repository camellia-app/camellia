import { render } from 'react-dom';
import { BackgroundMedia } from './components/BackgroundMedia/BackgroundMedia';
import { BottomToolbar } from './components/BottomToolbar/BottomToolbar';
import type { VoidFunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { BookmarkWorkspace } from './components/BookmarkWorkspace/BookmarkWorkspace';
import { BackgroundMediaFullScreenContainer } from './components/BackgroundMedia/BackgroundMediaFullScreenContainer';

export const Newtab: VoidFunctionComponent = () => {
  return (
    <Provider store={store}>
      <BookmarkWorkspace />
      <BottomToolbar />
      <BackgroundMediaFullScreenContainer>
        <BackgroundMedia />
      </BackgroundMediaFullScreenContainer>
    </Provider>
  );
};

const root = document.getElementById('root');

if (root === null) {
  throw new Error('Can not find #root element to initialize the app');
}

render(<Newtab />, root);

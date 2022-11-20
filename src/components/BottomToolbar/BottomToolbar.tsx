import type { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { getSupportedRuntimeFeatures } from '../../api/applicationRuntime/features';
import { useOption } from '../../api/options/hook';
import type { RootState } from '../../store';
import type { UnsplashState } from '../../store/slice/unsplashSlice';
import { ChipList } from '../ChipList/ChipList';
import { bottomToolbar } from './BottomToolbar.module.css';
import { BookmarkManager } from './ToolbarItem/BookmarkManager';
import { OptionsButton } from './ToolbarItem/OptionsButton';
import { SearchButton } from './ToolbarItem/SearchButton';
import { UnsplashPhotographerAttribution } from './ToolbarItem/UnsplashPhotographerAttribution';

export const BottomToolbar: FC = () => {
  const [showOptionsButton] = useOption('show_options_button');
  const [showBookmarkManagerButton] = useOption('show_bookmark_manager_button');
  const [showSearchButton] = useOption('show_search_button');
  const [displayUnsplashAttribution] = useOption('display_unsplash_attribution');

  const unsplashPhotographerAttributionsState = useSelector<RootState, UnsplashState>((state) => state.unsplash);

  const toolbarItems: Array<ReactNode> = [];

  if (showOptionsButton === true) {
    toolbarItems.push(<OptionsButton />);
  }

  if (getSupportedRuntimeFeatures().bookmarkManagerPage && showBookmarkManagerButton === true) {
    toolbarItems.push(<BookmarkManager />);
  }

  if (showSearchButton === true) {
    toolbarItems.push(<SearchButton />);
  }

  let showUnsplashButton = false;

  console.log('asdasdasdasdasd', unsplashPhotographerAttributionsState);

  if (unsplashPhotographerAttributionsState.photo !== undefined && displayUnsplashAttribution === true) {
    showUnsplashButton = true;
    toolbarItems.push(
      <UnsplashPhotographerAttribution shape={'squared'} unsplashPhoto={unsplashPhotographerAttributionsState.photo} />,
    );
  }

  return (
    <footer className={bottomToolbar}>
      <ChipList chips={toolbarItems} moveLastChipToRight={showUnsplashButton} type={'inline'} />
    </footer>
  );
};

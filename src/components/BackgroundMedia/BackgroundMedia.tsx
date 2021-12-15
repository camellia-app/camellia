import cn from 'classnames';
import type { ReactNode, VoidFunctionComponent } from 'react';
import { createContext, useState } from 'react';
import s from './BackgroundMedia.module.css';

type BackgroundMediaProps = {
  children: ReactNode;
};

type BackgroundMediaVisibilityContext = {
  isVisible: boolean;
  loadDefaultBackgroundMedia: (() => void) | undefined;
  makeVisible: (() => void) | undefined;
};

export const BackgroundMediaVisibility = createContext<BackgroundMediaVisibilityContext>({
  isVisible: false,
  loadDefaultBackgroundMedia: undefined,
  makeVisible: undefined,
});

export const BackgroundMedia: VoidFunctionComponent<BackgroundMediaProps> = (props) => {
  const [isVisible, setVisibility] = useState<boolean>(false);
  const [backgroundMediaHasError, loadFallbackMedia] = useState<boolean>(false);

  const backgroundMedia = !backgroundMediaHasError ? props.children : <div />;

  const makeVisible = (): void => {
    setVisibility(true);
  };

  const loadDefaultBackgroundMedia = (): void => {
    loadFallbackMedia(true);
  };

  const context = {
    isVisible,
    loadDefaultBackgroundMedia,
    makeVisible,
  };

  return (
    <BackgroundMediaVisibility.Provider value={context}>
      <div
        className={cn(s.backgroundMediaContainer, {
          [s.backgroundMediaContainerVisible]: isVisible,
        })}
      >
        {backgroundMedia}
      </div>
    </BackgroundMediaVisibility.Provider>
  );
};

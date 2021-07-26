import cn from 'classnames';
import { createContext, ReactNode, useState } from 'react';
import s from './BackgroundMedia.module.css';

interface BackgroundMediaProps {
  children: ReactNode;
}

interface BackgroundMediaVisibilityContext {
  isVisible: boolean;
  loadDefaultBackgroundMedia: () => void;
  makeVisible: () => void;
}

export const BackgroundMediaVisibility = createContext<BackgroundMediaVisibilityContext>({
  isVisible: false,
  loadDefaultBackgroundMedia: () => {},
  makeVisible: () => {},
});

export const BackgroundMedia = (props: BackgroundMediaProps) => {
  const [isVisible, setVisibility] = useState(false);
  const [backgroundMediaHasError, loadFallbackMedia] = useState(false);

  const backgroundMedia = backgroundMediaHasError === false
    ? props.children
    : <div />;

  const makeVisible = () => {
    setVisibility(true);
  };

  const loadDefaultBackgroundMedia = () => {
    loadFallbackMedia(true);
  };

  const context = {
    isVisible,
    loadDefaultBackgroundMedia,
    makeVisible,
  };

  return (
    <BackgroundMediaVisibility.Provider value={context}>
      <div className={cn(s.backgroundMediaContainer, {
        [s.backgroundMediaContainerVisible]: isVisible,
      })}
      >
        { backgroundMedia }
      </div>
    </BackgroundMediaVisibility.Provider>
  );
};

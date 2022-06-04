import type { FC } from 'react';
import { useState, StrictMode } from 'react';
import { OptionsSearchForm } from './components/Navigation/OptionsSearchForm/OptionsSearchForm';
import { categoriesMap } from './components/Navigation/OptionsCategory/OptionsCategories';
import { ActiveOptionCategory } from './ActiveOptionCategoryContext';
import { CategorizedOption } from './components/CategorizedOption/CategorizedOption';
import { LabeledCheckbox } from './components/Checkbox/LabeledCheckbox';
import { BackgroundImageSource } from './components/OptionControl/OptionEntry/BackgroundImageSource';
import { BackgroundMediaFullScreenContainer } from '../components/BackgroundMedia/BackgroundMediaFullScreenContainer';
import { BackgroundMedia } from '../components/BackgroundMedia/BackgroundMedia';
import { AboutApp } from './components/AboutApp/AboutApp';
import { createRoot } from 'react-dom/client';
import { CopyDebugInformation } from './components/OptionControl/OptionEntry/CopyDebugInformation';
import { ResetOptions } from './components/OptionControl/OptionEntry/ResetOptions';
import { ShowOptionsButton } from './components/OptionControl/OptionEntry/ShowOptionsButton';
import { ShowBookmarkManagerButton } from './components/OptionControl/OptionEntry/ShowBookmarkManagerButton';
import { ContentLayout } from './components/OptionControl/OptionEntry/ContentLayout';
import { UnsplashPhotographerAttribution } from './components/OptionControl/OptionEntry/UnsplashPhotographerAttribution';
import { ChipList } from '../components/ChipList/ChipList';
import { getSupportedRuntimeFeatures } from '../api/applicationRuntime/features';
import { ShowSearchButton } from './components/OptionControl/OptionEntry/ShowSearchButton';
import { Bookmark } from '../components/Bookmark/Bookmark';
import type { Bookmark as BookmarkEntry } from '../api/bookmark/common';
import { options, optionsContent, optionsWrapper } from './Options.module.css';

export const Options: FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);

  const links: Array<BookmarkEntry> = [
    {
      id: '0',
      title: 'Source code',
      type: 'link',
      url: 'https://github.com/camellia-app/camellia',
    },
    {
      id: '0',
      title: 'Report a bug',
      type: 'link',
      url: 'https://github.com/camellia-app/camellia/issues',
    },
    {
      id: '0',
      title: 'Community forum',
      type: 'link',
      url: 'https://github.com/camellia-app/camellia/discussions',
    },
    {
      id: '0',
      title: 'User manual',
      type: 'link',
      url: 'https://github.com/camellia-app/camellia/wiki',
    },
    {
      id: '0',
      title: 'Release notes',
      type: 'link',
      url: 'https://github.com/camellia-app/camellia/releases',
    },
  ];

  return (
    <StrictMode>
      <div className={optionsWrapper}>
        <div className={options}>
          <aside>
            <OptionsSearchForm
              activeCategory={activeCategory}
              onCategoryChange={(categoryId): void => setActiveCategory(categoryId)}
              onCategoryReset={(): void => setActiveCategory(undefined)}
            />
          </aside>

          <main className={optionsContent}>
            <ActiveOptionCategory.Provider value={activeCategory}>
              <BackgroundImageSource />

              <ContentLayout />

              <UnsplashPhotographerAttribution />

              {getSupportedRuntimeFeatures().bookmarkManagerPage ? <ShowBookmarkManagerButton /> : undefined}

              <ShowOptionsButton />

              <ShowSearchButton />

              <CategorizedOption categories={[categoriesMap.analytics]}>
                <LabeledCheckbox
                  description="We're gathering anonymous usage statistics via Google Analytics. We need such data to be sure our updates make Camellia better. We don't track links you visit, we don't analyze your bookmarks and folders names. At this moment there's no way to disable this option."
                  disabled
                  label="Send anonymous usage statistics"
                  loading={false}
                  value={true}
                />
              </CategorizedOption>

              <CategorizedOption categories={[categoriesMap.analytics]}>
                <LabeledCheckbox
                  description="We're using Sentry to track errors in Camellia. At this moment there's no way to disable this option."
                  disabled
                  label="Send error reports"
                  loading={false}
                  value={true}
                />
              </CategorizedOption>

              <ResetOptions />

              <CopyDebugInformation />

              <CategorizedOption categories={[categoriesMap.about]}>
                <>
                  <AboutApp />

                  <ChipList
                    chips={links.map((link, index) => (
                      <Bookmark bookmark={link} focus={false} key={index} />
                    ))}
                    type="inline"
                  />
                </>
              </CategorizedOption>
            </ActiveOptionCategory.Provider>
          </main>
        </div>
        <BackgroundMediaFullScreenContainer>
          <BackgroundMedia />
        </BackgroundMediaFullScreenContainer>
      </div>
    </StrictMode>
  );
};

const root = document.getElementById('root');

if (root !== null) {
  createRoot(root).render(<Options />);
}

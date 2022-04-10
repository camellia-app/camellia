import 'react-devtools';
import type { VFC } from 'react';
import { useState, StrictMode } from 'react';
import s from './Options.module.css';
import { OptionsSearchForm } from './components/Navigation/OptionsSearchForm/OptionsSearchForm';
import { categoriesMap } from './components/Navigation/OptionsCategory/OptionsCategories';
import { ActiveOptionCategory } from './ActiveOptionCategoryContext';
import { CategorizedOption } from './components/CategorizedOption/CategorizedOption';
import { LabeledCheckbox } from './components/Checkbox/LabeledCheckbox';
import { BackgroundImageSource } from './components/OptionControl/OptionEntry/BackgroundImageSource';
import { BackgroundMediaFullScreenContainer } from '../components/BackgroundMedia/BackgroundMediaFullScreenContainer';
import { BackgroundMedia } from '../components/BackgroundMedia/BackgroundMedia';
import { BookmarkInlineList } from '../components/BookmarkInlineList/BookmarkList';
import { AboutApp } from './components/AboutApp/AboutApp';
import { createRoot } from 'react-dom/client';
import { CopyDebugInformation } from './components/OptionControl/OptionEntry/CopyDebugInformation';
import { ResetOptions } from './components/OptionControl/OptionEntry/ResetOptions';
import { ShowOptionsButton } from './components/OptionControl/OptionEntry/ShowOptionsButton';
import { ShowBookmarkManagerButton } from './components/OptionControl/OptionEntry/ShowBookmarkManagerButton';
import { ContentLayout } from './components/OptionControl/OptionEntry/ContentLayout';
import { UnsplashPhotographerAttribution } from './components/OptionControl/OptionEntry/UnsplashPhotographerAttribution';

export const Options: VFC = () => {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);

  return (
    <StrictMode>
      <div className={s.optionsWrapper}>
        <div className={s.options}>
          <aside className={s.optionsSidebar}>
            <OptionsSearchForm
              activeCategory={activeCategory}
              onCategoryChange={(categoryId): void => setActiveCategory(categoryId)}
              onCategoryReset={(): void => setActiveCategory(undefined)}
            />
          </aside>

          <main className={s.optionsContent}>
            <ActiveOptionCategory.Provider value={activeCategory}>
              <BackgroundImageSource />

              <ContentLayout />

              <UnsplashPhotographerAttribution />

              <ShowBookmarkManagerButton />

              <ShowOptionsButton />

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

                  <BookmarkInlineList
                    bookmarks={[
                      {
                        idLocal: '0',
                        nestingLevel: 0,
                        parentIdLocal: undefined,
                        title: 'Source code',
                        type: 'link',
                        url: 'https://github.com/camellia-app/camellia',
                      },
                      {
                        idLocal: '0',
                        nestingLevel: 0,
                        parentIdLocal: undefined,
                        title: 'Report a bug',
                        type: 'link',
                        url: 'https://github.com/camellia-app/camellia/issues',
                      },
                      {
                        idLocal: '0',
                        nestingLevel: 0,
                        parentIdLocal: undefined,
                        title: 'Community forum',
                        type: 'link',
                        url: 'https://github.com/camellia-app/camellia/discussions',
                      },
                      {
                        idLocal: '0',
                        nestingLevel: 0,
                        parentIdLocal: undefined,
                        title: 'User manual',
                        type: 'link',
                        url: 'https://github.com/camellia-app/camellia/wiki',
                      },
                      {
                        idLocal: '0',
                        nestingLevel: 0,
                        parentIdLocal: undefined,
                        title: 'Release notes',
                        type: 'link',
                        url: 'https://github.com/camellia-app/camellia/releases',
                      },
                    ]}
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

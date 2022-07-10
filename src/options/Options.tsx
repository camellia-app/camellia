import type { FC } from 'react';
import { useState, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { getSupportedRuntimeFeatures } from '../api/applicationRuntime/features';
import { t } from '../api/i18n/translate';
import { BackgroundMedia } from '../components/BackgroundMedia/BackgroundMedia';
import { BackgroundMediaFullScreenContainer } from '../components/BackgroundMedia/BackgroundMediaFullScreenContainer';
import { ActiveOptionCategory } from './ActiveOptionCategoryContext';
import { AboutApp } from './components/AboutApp/AboutApp';
import { CategorizedOption } from './components/CategorizedOption/CategorizedOption';
import { LabeledCheckbox } from './components/Checkbox/LabeledCheckbox';
import { ContactLinks } from './components/ContactLinks/ContactLinks';
import { categoriesMap } from './components/Navigation/OptionsCategory/OptionsCategories';
import { OptionsSearchForm } from './components/Navigation/OptionsSearchForm/OptionsSearchForm';
import { BackgroundImageSource } from './components/OptionControl/OptionEntry/BackgroundImageSource';
import { ContentLayout } from './components/OptionControl/OptionEntry/ContentLayout';
import { CopyDebugInformation } from './components/OptionControl/OptionEntry/CopyDebugInformation';
import { ResetOptions } from './components/OptionControl/OptionEntry/ResetOptions';
import { ShowBookmarkManagerButton } from './components/OptionControl/OptionEntry/ShowBookmarkManagerButton';
import { ShowOptionsButton } from './components/OptionControl/OptionEntry/ShowOptionsButton';
import { ShowSearchButton } from './components/OptionControl/OptionEntry/ShowSearchButton';
import { UnsplashPhotographerAttribution } from './components/OptionControl/OptionEntry/UnsplashPhotographerAttribution';
import { options, optionsContent, optionsNavigation, optionsWrapper } from './Options.module.css';

export const Options: FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);

  return (
    <StrictMode>
      <div className={optionsWrapper}>
        <div className={options}>
          <aside>
            <div className={optionsNavigation}>
              <OptionsSearchForm
                activeCategory={activeCategory}
                onCategoryChange={(categoryId): void => setActiveCategory(categoryId)}
                onCategoryReset={(): void => setActiveCategory(undefined)}
              />
            </div>
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
                  description={t('option_analytics_description')}
                  disabled
                  label={t('option_analytics_label')}
                  loading={false}
                  value={true}
                />
              </CategorizedOption>

              <CategorizedOption categories={[categoriesMap.analytics]}>
                <LabeledCheckbox
                  description={t('option_sentry_description')}
                  disabled
                  label={t('option_sentry_label')}
                  loading={false}
                  value={true}
                />
              </CategorizedOption>

              <ResetOptions />

              <CopyDebugInformation />

              <AboutApp />

              <ContactLinks />
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

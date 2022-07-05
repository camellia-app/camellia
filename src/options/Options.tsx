import type { FC } from 'react';
import { useState, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { getSupportedRuntimeFeatures } from '../api/applicationRuntime/features';
import { t } from '../api/i18n/translate';
import { BackgroundMedia } from '../components/BackgroundMedia/BackgroundMedia';
import { BackgroundMediaFullScreenContainer } from '../components/BackgroundMedia/BackgroundMediaFullScreenContainer';
import { Chip } from '../components/Chip/Chip';
import { ChipList } from '../components/ChipList/ChipList';
import { ActiveOptionCategory } from './ActiveOptionCategoryContext';
import { AboutApp } from './components/AboutApp/AboutApp';
import { CategorizedOption } from './components/CategorizedOption/CategorizedOption';
import { LabeledCheckbox } from './components/Checkbox/LabeledCheckbox';
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
import { options, optionsContent, optionsWrapper } from './Options.module.css';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconBugReport = require('mdi/filled/bug_report.svg?fill=%23eee');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconCode = require('mdi/filled/code.svg?fill=%23eee');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconDescription = require('mdi/filled/description.svg?fill=%23eee');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconForum = require('mdi/filled/forum.svg?fill=%23eee');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconNewReleases = require('mdi/filled/new_releases.svg?fill=%23eee');

export const Options: FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);

  const links: Array<{ icon: string; title: string; url: string }> = [
    {
      title: t('about_externalLink_sourceCode'),
      url: 'https://github.com/camellia-app/camellia',
      icon: iconCode,
    },
    {
      title: t('about_externalLink_bugTracker'),
      url: 'https://github.com/camellia-app/camellia/issues',
      icon: iconBugReport,
    },
    {
      title: t('about_externalLink_communityForum'),
      url: 'https://github.com/camellia-app/camellia/discussions',
      icon: iconForum,
    },
    {
      title: t('about_externalLink_userManual'),
      url: 'https://github.com/camellia-app/camellia/wiki',
      icon: iconDescription,
    },
    {
      title: t('about_externalLink_releaseNotes'),
      url: 'https://github.com/camellia-app/camellia/releases',
      icon: iconNewReleases,
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

              <CategorizedOption categories={[categoriesMap.about]}>
                <>
                  <AboutApp />

                  <ChipList
                    chips={links.map((link, index) => (
                      <Chip
                        focus={false}
                        iconSrc={link.icon}
                        key={index}
                        label={link.title}
                        shape={'rounded'}
                        tooltip={link.title}
                        url={link.url}
                      />
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

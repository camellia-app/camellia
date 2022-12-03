import type { FC } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { AppPlatform, getPlatform } from '../../api/appEnvironment';
import { getSupportedRuntimeFeatures } from '../../api/applicationRuntime/features';
import { initializeSentry } from '../../api/utils/sentry';
import { config } from '../../config';
import { store } from '../../store';
import { BackgroundMedia } from '../common/BackgroundMedia/BackgroundMedia';
import { BackgroundMediaFullScreenContainer } from '../common/BackgroundMedia/BackgroundMediaFullScreenContainer';
import { AboutApp } from './AboutApp/AboutApp';
import { ContactLinks } from './ContactLinks/ContactLinks';
import { BackgroundImageSource } from './OptionControl/OptionEntry/BackgroundImageSource';
import { ContentLayout } from './OptionControl/OptionEntry/ContentLayout';
import { CopyDebugInformation } from './OptionControl/OptionEntry/CopyDebugInformation';
import { CreateDemoBookmarks } from './OptionControl/OptionEntry/CreateDemoBookmarks';
import { EnableAnalytics } from './OptionControl/OptionEntry/EnableAnalytics';
import { EnableErrorReporting } from './OptionControl/OptionEntry/EnableErrorReporting';
import { ResetOptions } from './OptionControl/OptionEntry/ResetOptions';
import { ShowBookmarkManagerButton } from './OptionControl/OptionEntry/ShowBookmarkManagerButton';
import { ShowOptionsButton } from './OptionControl/OptionEntry/ShowOptionsButton';
import { ShowSearchButton } from './OptionControl/OptionEntry/ShowSearchButton';
import { UnsplashPhotographerAttribution } from './OptionControl/OptionEntry/UnsplashPhotographerAttribution';
import { OptionsSearchForm } from './OptionsCategory/OptionsSearchForm/OptionsSearchForm';
import { options, optionsContent, optionsNavigation, optionsWrapper } from './OptionsPage.module.css';

initializeSentry();

if (getPlatform() === AppPlatform.Web) {
  await import('../../backgroundScript/background');
}

export const OptionsPage: FC = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <div className={optionsWrapper}>
          <div className={options}>
            <aside>
              <div className={optionsNavigation}>
                <OptionsSearchForm />
              </div>
            </aside>

            <main className={optionsContent}>
              <BackgroundImageSource />

              <ContentLayout />

              <UnsplashPhotographerAttribution />

              {getSupportedRuntimeFeatures().bookmarkManagerPage ? <ShowBookmarkManagerButton /> : undefined}

              <ShowOptionsButton />

              <ShowSearchButton />

              <EnableAnalytics />

              <EnableErrorReporting />

              <ResetOptions />

              {config.isDevelopment ? <CreateDemoBookmarks /> : undefined}

              <CopyDebugInformation />

              <AboutApp />

              <ContactLinks />
            </main>
          </div>

          <BackgroundMediaFullScreenContainer>
            <BackgroundMedia />
          </BackgroundMediaFullScreenContainer>
        </div>
      </Provider>
    </StrictMode>
  );
};

const root = document.getElementById('root');

if (root !== null) {
  createRoot(root).render(<OptionsPage />);
}

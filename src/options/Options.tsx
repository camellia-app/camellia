import type { FC } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { AppPlatform, getPlatform } from '../api/appEnvironment';
import { getSupportedRuntimeFeatures } from '../api/applicationRuntime/features';
import { initializeSentry } from '../api/utils/sentry';
import { BackgroundMedia } from '../components/BackgroundMedia/BackgroundMedia';
import { BackgroundMediaFullScreenContainer } from '../components/BackgroundMedia/BackgroundMediaFullScreenContainer';
import { config } from '../config';
import { store } from '../store';
import { AboutApp } from './components/AboutApp/AboutApp';
import { ContactLinks } from './components/ContactLinks/ContactLinks';
import { BackgroundImageSource } from './components/OptionControl/OptionEntry/BackgroundImageSource';
import { ContentLayout } from './components/OptionControl/OptionEntry/ContentLayout';
import { CopyDebugInformation } from './components/OptionControl/OptionEntry/CopyDebugInformation';
import { CreateDemoBookmarks } from './components/OptionControl/OptionEntry/CreateDemoBookmarks';
import { EnableAnalytics } from './components/OptionControl/OptionEntry/EnableAnalytics';
import { EnableErrorReporting } from './components/OptionControl/OptionEntry/EnableErrorReporting';
import { ResetOptions } from './components/OptionControl/OptionEntry/ResetOptions';
import { ShowBookmarkManagerButton } from './components/OptionControl/OptionEntry/ShowBookmarkManagerButton';
import { ShowOptionsButton } from './components/OptionControl/OptionEntry/ShowOptionsButton';
import { ShowSearchButton } from './components/OptionControl/OptionEntry/ShowSearchButton';
import { UnsplashPhotographerAttribution } from './components/OptionControl/OptionEntry/UnsplashPhotographerAttribution';
import { OptionsSearchForm } from './components/OptionsCategory/OptionsSearchForm/OptionsSearchForm';
import { options, optionsContent, optionsNavigation, optionsWrapper } from './Options.module.css';

initializeSentry();

if (getPlatform() === AppPlatform.Web) {
  await import('../backgroundScript/background');
}

export const Options: FC = () => {
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
  createRoot(root).render(<Options />);
}

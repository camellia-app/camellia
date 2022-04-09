import type { VFC } from 'react';
import { LabeledActionButton } from '../../ActionButton/LabeledActionButton';
import { useAppEnvironment } from '../../../../hooks/useAppEnvironment';
import { getPlatform } from '../../../../api/appEnvironment';
import { categoriesMap } from '../../Navigation/OptionsCategory/OptionsCategories';
import { CategorizedOption } from '../../CategorizedOption/CategorizedOption';

export const CopyDebugInformation: VFC = () => {
  const appEnvironmentInfo = useAppEnvironment();

  return (
    <CategorizedOption categories={[categoriesMap.advanced]}>
      <LabeledActionButton
        buttonHtmlType={'button'}
        clickHandler={(): void => {
          if (appEnvironmentInfo === undefined) {
            return;
          }

          navigator.clipboard.writeText(
            `- App: ${appEnvironmentInfo.app.name}, ${appEnvironmentInfo.app.version} (${getPlatform()})\n- Browser: ${
              appEnvironmentInfo.browser.name
            }, ${appEnvironmentInfo.browser.version}\n- Platform: ${appEnvironmentInfo.platform.os}, ${
              appEnvironmentInfo.platform.arch
            }`,
          );
        }}
        description={
          'Information that may be helpful for debugging purposes will be copied to your clipboard by pressing the button. You are safe to share this information with community of contributors via GitHub issues in case you wish to report a bug you discovered in Camellia.'
        }
        disabled={false}
        label={'Copy debug information'}
        loading={false}
      />
    </CategorizedOption>
  );
};

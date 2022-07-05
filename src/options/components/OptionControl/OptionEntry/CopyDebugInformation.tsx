import type { FC } from 'react';
import { getPlatform } from '../../../../api/appEnvironment';
import { useAppEnvironment } from '../../../../api/appEnvironment/hook';
import { t } from '../../../../api/i18n/translate';
import { LabeledActionButton } from '../../ActionButton/LabeledActionButton';
import { CategorizedOption } from '../../CategorizedOption/CategorizedOption';
import { categoriesMap } from '../../Navigation/OptionsCategory/OptionsCategories';

export const CopyDebugInformation: FC = () => {
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
        description={t('option_copyDebugInformation_description')}
        disabled={false}
        label={t('option_copyDebugInformation_label')}
        loading={false}
      />
    </CategorizedOption>
  );
};

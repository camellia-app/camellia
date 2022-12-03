import type { FC } from 'react';
import { getPlatform } from '../../../../api/appEnvironment';
import { useAppEnvironment } from '../../../../api/appEnvironment/hook';
import { useAppInfo } from '../../../../api/appInfo/hook';
import { t } from '../../../../api/i18n/translate';
import { LabeledActionButton } from '../../ActionButton/LabeledActionButton';
import { FilteredOptions } from '../../OptionsCategory/FilteredOptions/FilteredOptions';
import { categoriesMap } from '../../OptionsCategory/OptionsSearchForm/OptionsSearchForm';

export const CopyDebugInformation: FC = () => {
  const appEnvironmentInfo = useAppEnvironment();
  const appInfo = useAppInfo();

  return (
    <FilteredOptions categories={[categoriesMap.advanced]}>
      <LabeledActionButton
        buttonHtmlType={'button'}
        clickHandler={(): void => {
          if (appEnvironmentInfo === undefined) {
            return;
          }

          navigator.clipboard.writeText(
            `- App: ${appInfo.name}, ${appInfo.version} (${getPlatform()})\n- Browser: ${
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
    </FilteredOptions>
  );
};

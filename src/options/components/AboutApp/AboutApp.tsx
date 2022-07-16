import type { FC } from 'react';
import { useAppEnvironment } from '../../../api/appEnvironment/hook';
import { useAppInfo } from '../../../api/appInfo/hook';
import { t } from '../../../api/i18n/translate';
import { CategorizedOption } from '../CategorizedOption/CategorizedOption';
import { categoriesMap } from '../Navigation/OptionsCategory/OptionsCategories';
import { Paragraph } from '../Paragraph/Paragraph';
import { aboutApp, aboutAppName } from './AboutApp.module.css';

export const AboutApp: FC = () => {
  const appEnvironment = useAppEnvironment();
  const appInfo = useAppInfo();

  if (appEnvironment === undefined) {
    return <></>;
  }

  return (
    <CategorizedOption categories={[categoriesMap.about]}>
      <div className={aboutApp}>
        <span className={aboutAppName}>{t('about_app_version', [appInfo.name, appInfo.version])}</span>

        <Paragraph>
          Designed and developed by{' '}
          <a href="https://github.com/flaksp" rel="noreferrer noopener" target="_blank">
            Petr Flaks
          </a>{' '}
          with help of{' '}
          <a
            href="https://github.com/camellia-app/camellia/graphs/contributors"
            rel="noreferrer noopener"
            target="_blank"
          >
            awesome contributors
          </a>{' '}
          ❤️
        </Paragraph>
      </div>
    </CategorizedOption>
  );
};

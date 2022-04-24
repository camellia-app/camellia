import s from './AboutApp.module.css';
import type { VFC } from 'react';
import { useAppEnvironment } from '../../../api/appEnvironment/hook';
import { Paragraph } from '../Paragraph/Paragraph';

export const AboutApp: VFC = () => {
  const appEnvironment = useAppEnvironment();

  if (appEnvironment === undefined) {
    return <></>;
  }

  return (
    <div className={s.aboutApp}>
      <span className={s.aboutAppName}>
        {appEnvironment.app.name}, version {appEnvironment.app.version}
      </span>

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
  );
};

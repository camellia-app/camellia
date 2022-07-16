import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { t } from '../../../api/i18n/translate';
import { UnsplashPhotographerAttribution } from '../../../components/BottomToolbar/ToolbarItem/UnsplashPhotographerAttribution';
import { Chip } from '../../../components/Chip/Chip';
import { ChipList } from '../../../components/ChipList/ChipList';
import type { RootState } from '../../../store';
import type { UnsplashState } from '../../../store/slice/unsplashSlice';
import { CategorizedOption } from '../CategorizedOption/CategorizedOption';
import { categoriesMap } from '../Navigation/OptionsCategory/OptionsCategories';
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

export const ContactLinks: FC = () => {
  const unsplashPhotographerAttributionsState = useSelector<RootState, UnsplashState>((state) => state.unsplash);

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

  const chips = links.map((link, index) => (
    <Chip iconSrc={link.icon} key={index} label={link.title} shape={'rounded'} url={link.url} />
  ));

  if (unsplashPhotographerAttributionsState.photo !== undefined) {
    chips.push(
      <UnsplashPhotographerAttribution shape={'rounded'} unsplashPhoto={unsplashPhotographerAttributionsState.photo} />,
    );
  }

  return (
    <CategorizedOption categories={[categoriesMap.about]}>
      <ChipList chips={chips} type="inline" />
    </CategorizedOption>
  );
};

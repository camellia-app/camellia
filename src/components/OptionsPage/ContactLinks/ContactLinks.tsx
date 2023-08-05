import type { FC, ReactElement } from 'react';

import IconBugReport from '@material-design-icons/svg/filled/bug_report.svg';
import IconCode from '@material-design-icons/svg/filled/code.svg';
import IconDescription from '@material-design-icons/svg/filled/description.svg';
import IconForum from '@material-design-icons/svg/filled/forum.svg';
import IconNewReleases from '@material-design-icons/svg/filled/new_releases.svg';
import IconPrivacyTip from '@material-design-icons/svg/filled/privacy_tip.svg';
import { useSelector } from 'react-redux';

import type { RootState } from '../../../store';
import type { UnsplashState } from '../../../store/slice/unsplashSlice';

import { t } from '../../../api/i18n/translate';
import { UnsplashPhotographerAttribution } from '../../NewtabPage/BottomToolbar/ToolbarItem/UnsplashPhotographerAttribution';
import { Chip } from '../../common/Chip/Chip';
import { ChipList } from '../../common/ChipList/ChipList';
import { FilteredOptions } from '../OptionsCategory/FilteredOptions/FilteredOptions';
import { categoriesMap } from '../OptionsCategory/OptionsSearchForm/OptionsSearchForm';

export const ContactLinks: FC = () => {
  const unsplashPhotographerAttributionsState = useSelector<RootState, UnsplashState>((state) => state.unsplash);

  const links: Array<{ icon: ReactElement; title: string; url: string }> = [
    {
      icon: <IconCode />,
      title: t('about_externalLink_sourceCode'),
      url: 'https://github.com/camellia-app/camellia',
    },
    {
      icon: <IconBugReport />,
      title: t('about_externalLink_bugTracker'),
      url: 'https://github.com/camellia-app/camellia/issues',
    },
    {
      icon: <IconForum />,
      title: t('about_externalLink_communityForum'),
      url: 'https://github.com/camellia-app/camellia/discussions',
    },
    {
      icon: <IconDescription />,
      title: t('about_externalLink_userManual'),
      url: 'https://github.com/camellia-app/camellia/wiki',
    },
    {
      icon: <IconNewReleases />,
      title: t('about_externalLink_releaseNotes'),
      url: 'https://github.com/camellia-app/camellia/releases',
    },
    {
      icon: <IconPrivacyTip />,
      title: t('about_externalLink_privacyPolicy'),
      url: 'https://github.com/camellia-app/camellia/wiki/Privacy-Policy',
    },
  ];

  const chips = links.map((link, index) => (
    <Chip key={index} label={link.title} shape={'rounded'} svg={link.icon} url={link.url} />
  ));

  if (unsplashPhotographerAttributionsState.photo !== undefined) {
    chips.push(
      <UnsplashPhotographerAttribution shape={'rounded'} unsplashPhoto={unsplashPhotographerAttributionsState.photo} />,
    );
  }

  return (
    <FilteredOptions categories={[categoriesMap.about]}>
      <ChipList chips={chips} type="inline" />
    </FilteredOptions>
  );
};

import IconBugReport from '@material-design-icons/svg/filled/bug_report.svg';
import IconCode from '@material-design-icons/svg/filled/code.svg';
import IconDescription from '@material-design-icons/svg/filled/description.svg';
import IconForum from '@material-design-icons/svg/filled/forum.svg';
import IconNewReleases from '@material-design-icons/svg/filled/new_releases.svg';
import type { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { t } from '../../../api/i18n/translate';
import { UnsplashPhotographerAttribution } from '../../../components/BottomToolbar/ToolbarItem/UnsplashPhotographerAttribution';
import { Chip } from '../../../components/Chip/Chip';
import { ChipList } from '../../../components/ChipList/ChipList';
import type { RootState } from '../../../store';
import type { UnsplashState } from '../../../store/slice/unsplashSlice';
import { CategorizedOption } from '../CategorizedOption/CategorizedOption';
import { categoriesMap } from '../Navigation/OptionsSearchForm/OptionsSearchForm';

export const ContactLinks: FC = () => {
  const unsplashPhotographerAttributionsState = useSelector<RootState, UnsplashState>((state) => state.unsplash);

  const links: Array<{ icon: ReactElement; title: string; url: string }> = [
    {
      title: t('about_externalLink_sourceCode'),
      url: 'https://github.com/camellia-app/camellia',
      icon: <IconCode />,
    },
    {
      title: t('about_externalLink_bugTracker'),
      url: 'https://github.com/camellia-app/camellia/issues',
      icon: <IconBugReport />,
    },
    {
      title: t('about_externalLink_communityForum'),
      url: 'https://github.com/camellia-app/camellia/discussions',
      icon: <IconForum />,
    },
    {
      title: t('about_externalLink_userManual'),
      url: 'https://github.com/camellia-app/camellia/wiki',
      icon: <IconDescription />,
    },
    {
      title: t('about_externalLink_releaseNotes'),
      url: 'https://github.com/camellia-app/camellia/releases',
      icon: <IconNewReleases />,
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
    <CategorizedOption categories={[categoriesMap.about]}>
      <ChipList chips={chips} type="inline" />
    </CategorizedOption>
  );
};

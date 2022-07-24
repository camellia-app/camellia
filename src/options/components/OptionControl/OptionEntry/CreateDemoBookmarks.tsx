import type { FC } from 'react';
import { generateDemoBookmarks } from '../../../../api/bookmark';
import { LabeledActionButton } from '../../ActionButton/LabeledActionButton';
import { CategorizedOption } from '../../CategorizedOption/CategorizedOption';
import { categoriesMap } from '../../Navigation/OptionsCategory/OptionsCategories';

export const CreateDemoBookmarks: FC = () => {
  return (
    <CategorizedOption categories={[categoriesMap.bookmarks, categoriesMap.advanced]}>
      <LabeledActionButton
        buttonHtmlType={'button'}
        clickHandler={(): void => {
          generateDemoBookmarks();
        }}
        description={
          'About 5000 demo bookmarks and folders will be created. We use list of top real 5000 websites from the internet for demo bookmarks to make sure favicons and some other features work well. Please note that bookmarks leading to NSFW sites may be generated! It would be nice if you remove such links from "top-websites.json" file and send us a pull request.'
        }
        disabled={false}
        label={'Create demo bookmarks'}
        loading={false}
      />
    </CategorizedOption>
  );
};
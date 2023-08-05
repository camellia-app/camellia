import type { FC, FormEventHandler } from 'react';

import { useCallback, useDeferredValue, useEffect, useState } from 'react';

import type { TranslationKey } from '../../../api/i18n/translate';

import { openUrl } from '../../../api/applicationRuntime/navigation';
import { isLink } from '../../../api/bookmark/common';
import { getCtrlKeyName, getEnterKeyName, t } from '../../../api/i18n/translate';
import { useBookmarkSearch } from '../../../store/hooks/useBookmarkSearchHook';
import { Paragraph } from '../../OptionsPage/Paragraph/Paragraph';
import { ChipList } from '../../common/ChipList/ChipList';
import { TextField } from '../../common/TextField/TextField';
import { Translation } from '../../common/Translation/Translation';
import { Bookmark } from '../Bookmark/Bookmark';
import { ModalDialog } from '../ModalDialog/ModalDialog';
import { bookmarkSearchDialog, searchDialogTip } from './BookmarkSearchDialog.module.css';

export const BookmarkSearchDialog: FC = () => {
  const [isActive, searchResultBookmarks, toggleSearch, searchBookmarks] = useBookmarkSearch();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [tip, setTip] = useState<[TranslationKey, Array<string> | undefined]>();

  useEffect(() => {
    const tipsMessages: Array<[TranslationKey, Array<string> | undefined]> = [
      ['bookmarkSearch_tip_ctrlF', [getCtrlKeyName()]],
      ['bookmarkSearch_tip_escKey', undefined],
      ['bookmarkSearch_tip_enterKey', [getEnterKeyName()]],
      ['bookmarkSearch_tip_pressingAnyCharacter', undefined],
    ];

    setTip(tipsMessages[Math.floor(Math.random() * tipsMessages.length)]);
  }, []);

  const fieldInputHandler = (value: string): void => {
    setSearchQuery(value.trim());
  };

  useEffect(() => {
    searchBookmarks(deferredSearchQuery);
  }, [deferredSearchQuery, searchBookmarks]);

  useEffect(() => {
    const characterKeyPressHandler = (event: KeyboardEvent): void => {
      if (isActive) {
        return;
      }

      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      if (event.key.length !== 1) {
        return;
      }

      toggleSearch(true);
    };

    const searchHotKeyPressHandler = (event: KeyboardEvent): void => {
      const isCtrlPressed = event.ctrlKey || event.metaKey;

      if (
        (isCtrlPressed && event.key === 'f') ||
        (isCtrlPressed && event.key === 'g') ||
        (isCtrlPressed && event.key === 'k')
      ) {
        event.preventDefault();

        toggleSearch(true);
      }
    };

    document.addEventListener('keydown', characterKeyPressHandler);
    document.addEventListener('keydown', searchHotKeyPressHandler);

    return (): void => {
      document.removeEventListener('keydown', characterKeyPressHandler);
      document.removeEventListener('keydown', searchHotKeyPressHandler);
    };
  }, [isActive, toggleSearch]);

  const closeSearchModal = useCallback((): void => {
    setSearchQuery('');
    toggleSearch(false);
  }, [toggleSearch]);

  const bookmarkChips = searchResultBookmarks.slice(0, 200).map((bookmark, index) => {
    return <Bookmark bookmark={bookmark} key={index} />;
  });

  const formSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    for (const bookmark of searchResultBookmarks) {
      if (!isLink(bookmark)) {
        continue;
      }

      openUrl(bookmark.url);

      break;
    }
  };

  return (
    <ModalDialog isOpen={isActive} onClosePopup={closeSearchModal} title={t('bookmarkSearch_textField_modalTitle')}>
      <div className={bookmarkSearchDialog}>
        <form onSubmit={formSubmitHandler}>
          <TextField
            autoFocus={true} // eslint-disable-line jsx-a11y/no-autofocus
            changeHandler={fieldInputHandler}
            controlWidth={'fluid'}
            placeholder={t('bookmarkSearch_textField_placeholder')}
            type={'search'}
            value={searchQuery}
          />
        </form>

        {bookmarkChips.length > 0 && <ChipList chips={bookmarkChips} type={'inline'} />}

        {tip !== undefined && (
          <footer className={searchDialogTip}>
            <Paragraph>
              <Translation placeholderReplacements={tip[1]} translationKey={tip[0]} />
            </Paragraph>
          </footer>
        )}
      </div>
    </ModalDialog>
  );
};

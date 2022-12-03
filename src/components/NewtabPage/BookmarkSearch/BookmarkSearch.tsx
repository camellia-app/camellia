import type { ChangeEventHandler, FormEventHandler, FC } from 'react';
import { useDeferredValue, useEffect, useRef, useState } from 'react';
import { t } from '../../../api/i18n/translate';
import { useBookmarkSearch } from '../../../store/hooks/useBookmarkSearchHook';
import { bookmarkSearchCloseButton, bookmarkSearchField } from './BookmarkSearch.module.css';

export const BookmarkSearch: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [isActive, , toggleSearch, searchBookmarks] = useBookmarkSearch();
  const textFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchBookmarks(deferredSearchQuery);
  }, [deferredSearchQuery, searchBookmarks]);

  useEffect(() => {
    if (isActive) {
      textFieldRef.current?.focus();
    }
  }, [isActive]);

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

      if ((isCtrlPressed && event.key === 'f') || (isCtrlPressed && event.key === 'g')) {
        event.preventDefault();

        toggleSearch(true);
      }
    };

    const escapePressHandler = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && isActive) {
        toggleSearch(false);
      }
    };

    document.addEventListener('keydown', characterKeyPressHandler);
    document.addEventListener('keydown', searchHotKeyPressHandler);
    document.addEventListener('keydown', escapePressHandler);

    return (): void => {
      document.removeEventListener('keydown', characterKeyPressHandler);
      document.removeEventListener('keydown', searchHotKeyPressHandler);
      document.removeEventListener('keydown', escapePressHandler);
    };
  }, [isActive, toggleSearch]);

  const formSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  const formResetHandler: FormEventHandler<HTMLFormElement> = () => {
    setSearchQuery('');
    toggleSearch(false);
  };

  const fieldInputHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchQuery(event.currentTarget.value.trim());
  };

  if (!isActive) {
    return null;
  }

  return (
    <form onReset={formResetHandler} onSubmit={formSubmitHandler}>
      <input
        className={bookmarkSearchField}
        onChange={fieldInputHandler}
        placeholder={t('bookmarkSearch_textField_placeholder')}
        ref={textFieldRef}
        type="search"
        value={searchQuery}
      />

      <button className={bookmarkSearchCloseButton} title={t('bookmarkSearch_closeButton_label')} type="reset">
        {t('bookmarkSearch_closeButton_label')}
      </button>
    </form>
  );
};

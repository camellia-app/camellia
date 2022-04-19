import type { ChangeEventHandler, FormEventHandler, VFC } from 'react';
import { useEffect } from 'react';
import s from './BookmarkSearch.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookmarks, searchBookmarks } from '../../store/actionCreators/bookmark';
import type { RootState } from '../../store/reducers';
import { closeSearch, openSearch } from '../../store/actionCreators/bookmarkSearch';
import type { BookmarkSearchState } from '../../store/reducers/bookmarkSearchReducer';

export const BookmarkSearch: VFC = () => {
  const bookmarkSearchState = useSelector<RootState, BookmarkSearchState>((state) => state.bookmarkSearch);

  const dispatch = useDispatch();

  useEffect(() => {
    const characterKeyPressHandler = (event: KeyboardEvent): void => {
      if (bookmarkSearchState.show) {
        return;
      }

      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      if (event.key.length !== 1) {
        return;
      }

      dispatch(openSearch(event.key));
    };

    const searchHotKeyPressHandler = (event: KeyboardEvent): void => {
      const isCtrlPressed = event.ctrlKey || event.metaKey;

      if ((isCtrlPressed && event.key === 'f') || (isCtrlPressed && event.key === 'g')) {
        event.preventDefault();

        dispatch(openSearch(''));
      }
    };

    const escapePressHandler = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && bookmarkSearchState.show) {
        dispatch(fetchBookmarks());
        dispatch(closeSearch());
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
  }, [bookmarkSearchState.show, dispatch]);

  const formSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  const formResetHandler: FormEventHandler<HTMLFormElement> = () => {
    dispatch(fetchBookmarks());
    dispatch(closeSearch());
  };

  const fieldInputHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(searchBookmarks(event.currentTarget.value));
  };

  if (!bookmarkSearchState.show) {
    return null;
  }

  return (
    <form onReset={formResetHandler} onSubmit={formSubmitHandler}>
      <input
        autoFocus={true} // eslint-disable-line jsx-a11y/no-autofocus
        className={s.bookmarkSearchField}
        onChange={fieldInputHandler}
        placeholder="Start typing to search bookmarks..."
        type="search"
      />
      <button className={s.bookmarkSearchCloseButton} title="Close search" type="reset">
        Close search
      </button>
    </form>
  );
};

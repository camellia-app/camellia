import type { ChangeEventHandler, FormEventHandler, FC } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import type { BookmarkSearchState } from '../../store/slice/bookmarkSearchSlice';
import { bookmarkSearchSlice, searchBookmarksThunk } from '../../store/slice/bookmarkSearchSlice';
import { bookmarkSearchCloseButton, bookmarkSearchField } from './BookmarkSearch.module.css';

export const BookmarkSearch: FC = () => {
  const bookmarkSearchState = useSelector<RootState, BookmarkSearchState>((state) => state.bookmarkSearch);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const characterKeyPressHandler = (event: KeyboardEvent): void => {
      if (bookmarkSearchState.isActive) {
        return;
      }

      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      if (event.key.length !== 1) {
        return;
      }

      dispatch(searchBookmarksThunk(event.key));
    };

    const searchHotKeyPressHandler = (event: KeyboardEvent): void => {
      const isCtrlPressed = event.ctrlKey || event.metaKey;

      if ((isCtrlPressed && event.key === 'f') || (isCtrlPressed && event.key === 'g')) {
        event.preventDefault();

        dispatch(searchBookmarksThunk(''));
      }
    };

    const escapePressHandler = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && bookmarkSearchState.isActive) {
        dispatch(bookmarkSearchSlice.actions.closeSearch());
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
  }, [bookmarkSearchState.isActive, dispatch]);

  const formSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  const formResetHandler: FormEventHandler<HTMLFormElement> = () => {
    dispatch(bookmarkSearchSlice.actions.closeSearch());
  };

  const fieldInputHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(searchBookmarksThunk(event.currentTarget.value));
  };

  if (!bookmarkSearchState.isActive) {
    return null;
  }

  return (
    <form onReset={formResetHandler} onSubmit={formSubmitHandler}>
      <input
        autoFocus={true} // eslint-disable-line jsx-a11y/no-autofocus
        className={bookmarkSearchField}
        defaultValue={bookmarkSearchState.searchQuery}
        onChange={fieldInputHandler}
        placeholder="Start typing to search bookmarks..."
        type="search"
      />
      <button className={bookmarkSearchCloseButton} title="Close search" type="reset">
        Close search
      </button>
    </form>
  );
};

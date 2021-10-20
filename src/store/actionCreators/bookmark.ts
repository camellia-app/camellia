import { BookmarkAction, BookmarkActionTypes } from '../reducers/bookmarkReducer';
import { Dispatch } from 'redux';
import { getBookmarkManager } from '../../bookmarkManager/bookmarkManager';

export const fetchBookmarks = () => {
  return async (dispatch: Dispatch<BookmarkAction>): Promise<void> => {
    dispatch({
      type: BookmarkActionTypes.FETCH_BOOKMARKS,
    });

    const bookmarksTree = await getBookmarkManager().getAllBookmarks();

    dispatch({
      type: BookmarkActionTypes.FETCH_BOOKMARKS_SUCCESS,
      payload: bookmarksTree,
    });
  };
};

export const searchBookmarks = (query: string) => {
  return async (dispatch: Dispatch<BookmarkAction>): Promise<void> => {
    const bookmarksTree = await getBookmarkManager().searchBookmarks(query);

    dispatch({
      type: BookmarkActionTypes.FETCH_BOOKMARKS_SUCCESS,
      payload: [
        {
          type: 'folder',
          children: bookmarksTree,
          title: 'Search results',
          nestingLevel: 0,
          isRootFolder: true,
          idLocal: '-1',
          parentIdLocal: undefined,
        },
      ],
    });
  };
};

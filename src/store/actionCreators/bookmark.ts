import { BookmarkAction, BookmarkActionTypes } from '../reducers/bookmarkReducer';
import { Dispatch } from 'redux';
import { getTree, search } from '../../bookmarks/BookmarkManager';

export const fetchBookmarks = () => {
  return async (dispatch: Dispatch<BookmarkAction>): Promise<void> => {
    dispatch({
      type: BookmarkActionTypes.FETCH_BOOKMARKS,
    });

    const bookmarksTree = await getTree();

    dispatch({
      type: BookmarkActionTypes.FETCH_BOOKMARKS_SUCCESS,
      payload: bookmarksTree,
    });
  };
};

export const searchBookmarks = (query: string) => {
  return async (dispatch: Dispatch<BookmarkAction>): Promise<void> => {
    const bookmarksTree = await search(query);

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
        },
      ],
    });
  };
};

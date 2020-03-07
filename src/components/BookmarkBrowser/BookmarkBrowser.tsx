import { Component, h } from 'preact';
import * as classnames from 'classnames';
import * as s from './BookmarkBrowser.css';
import BookmarkCategory from '../BookmarkCategory/BookmarkCategory';

import BookmarkTreeNode = browser.bookmarks.BookmarkTreeNode;

export interface BookmarkBrowserProps {
  bookmarkCategories: Promise<BookmarkTreeNode[]>;
}

export interface BookmarkBrowserState {
  loaded: boolean;
  categories: BookmarkTreeNode[];
}

export default class BookmarkBrowser extends Component<BookmarkBrowserProps, BookmarkBrowserState> {
  constructor() {
    super();

    this.state = {
      categories: [],
      loaded: false,
    };
  }

  async componentDidMount() {
    this.props.bookmarkCategories.then((rootBookmarkTree: BookmarkTreeNode[]) => {
      const categories = rootBookmarkTree[0].children;

      this.setState({
        categories: categories.filter((category: BookmarkTreeNode) => category.children.length > 0),
        loaded: true,
      });
    });
  }

  render(props: BookmarkBrowserProps, state: BookmarkBrowserState) {
    const classes = state.loaded === false
      ? classnames(s.bookmarkBrowser, s.loading)
      : s.bookmarkBrowser;

    if (state.categories.length === 0) {
      return (
        <main className={classes}>
          <p className={s.noBookmarksMessage}>
            Add your first bookmarks to get started with Camellia
          </p>
        </main>
      );
    }

    return (
      <main className={classes}>
        {state.categories.map((item) => (
          <BookmarkCategory key={item.id} bookmarks={item.children} categoryTitle={item.title} />
        ))}
      </main>
    );
  }
}

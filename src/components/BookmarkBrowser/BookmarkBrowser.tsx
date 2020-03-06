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
      this.setState({
        categories: rootBookmarkTree[0].children,
        loaded: true,
      });
    });
  }

  render(props: BookmarkBrowserProps, state: BookmarkBrowserState) {
    const classes = state.loaded === false
      ? classnames(s.bookmarkBrowser, s.loading)
      : s.bookmarkBrowser;

    return (
      <main className={classes}>
        {state.categories.map((item) => (
          <BookmarkCategory key={item.id} bookmarks={item.children} categoryTitle={item.title} />
        ))}
      </main>
    );
  }
}

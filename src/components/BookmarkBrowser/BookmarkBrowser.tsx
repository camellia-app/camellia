import { Component, h } from 'preact';
import * as classnames from 'classnames';
import * as s from './BookmarkBrowser.css';
import BookmarkCategory from '../BookmarkCategory/BookmarkCategory';
import BookmarkRootCategory from '../../bookmarks/BookmarkRootCategory';

export interface BookmarkBrowserProps {
  bookmarkCategories: Promise<BookmarkRootCategory[]>;
}

export interface BookmarkBrowserState {
  loaded: boolean;
  categories: BookmarkRootCategory[];
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
    this.props.bookmarkCategories.then((categories: BookmarkRootCategory[]) => {
      this.setState({
        categories: categories.filter((category: BookmarkRootCategory) => category.children.length > 0),
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
          <BookmarkCategory key={item.browserId} bookmarks={item.children} categoryTitle={item.title} />
        ))}
      </main>
    );
  }
}

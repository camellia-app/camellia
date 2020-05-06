import { Component, Fragment, h } from 'preact';
import * as classnames from 'classnames';
import * as s from './BookmarkBrowser.css';
import BookmarkCategory from '../BookmarkCategory/BookmarkCategory';
import BookmarkRootCategory from '../../bookmarks/BookmarkRootCategory';
import BookmarkSearch from '../BookmarkSearch/BookmarkSearch';
import Bookmark from '../../bookmarks/Bookmark';

export interface BookmarkBrowserProps {
  bookmarkCategories: Promise<BookmarkRootCategory[]>;
}

export interface BookmarkBrowserState {
  loaded: boolean;
  showSearchBar: boolean;
  categories: BookmarkRootCategory[];
  searchResults: Bookmark[];
}

export default class BookmarkBrowser extends Component<BookmarkBrowserProps, BookmarkBrowserState> {
  constructor() {
    super();

    this.state = {
      categories: [],
      loaded: false,
      searchResults: [],
      showSearchBar: false,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.characterKeyPressHandler);
    document.addEventListener('keydown', this.searchHotkeyPressHandler);

    this.props.bookmarkCategories.then((categories: BookmarkRootCategory[]) => {
      this.setState({
        categories: categories.filter((category: BookmarkRootCategory) => category.children.length > 0),
        loaded: true,
      });
    });
  }

  componentWillUnmount(): void {
    document.removeEventListener('keydown', this.characterKeyPressHandler);
    document.removeEventListener('keydown', this.searchHotkeyPressHandler);
  }

  private characterKeyPressHandler = (event: KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }

    if (event.key.length !== 1) {
      return;
    }

    this.showSearchBar();
  };

  private showSearchBar = () => {
    if (this.state.showSearchBar === false) {
      this.setState({
        showSearchBar: true,
      });
    }
  };

  private searchHotkeyPressHandler = (event: KeyboardEvent) => {
    const isCtrlPressed = event.ctrlKey || event.metaKey;

    if ((isCtrlPressed && event.key === 'f') || (isCtrlPressed && event.key === 'g')) {
      event.preventDefault();

      this.showSearchBar();
    }
  };

  private hideSearchBar = (): void => {
    this.setState({
      showSearchBar: false,
    });
  };

  private updateSearchResults = (searchResults: Promise<Bookmark[]>): void => {
    searchResults.then((bookmarks) => {
      this.setState({
        searchResults: bookmarks,
      });
    });
  };

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

    if (state.showSearchBar) {
      return (
        <main className={classes}>
          <BookmarkSearch hideSearchBar={this.hideSearchBar} updateSearchResults={this.updateSearchResults} />
          <BookmarkCategory bookmarks={state.searchResults} categoryTitle="Search results" />
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

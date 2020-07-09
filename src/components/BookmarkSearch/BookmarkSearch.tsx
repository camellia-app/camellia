import {
  Component, createRef, h, JSX,
} from 'preact';
import { Link } from '../../bookmarks/Bookmark';
import { search } from '../../bookmarks/BookmarkManager';
import * as s from './BookmarkSearch.css';

interface BookmarkSearchProps {
  firstResult: Link | null;
  hideSearchBar: () => void;
  updateSearchResults: (bookmarks: Promise<Link[]>) => Promise<void>;
}

interface BookmarkSearchState {
}

export class BookmarkSearch extends Component<BookmarkSearchProps, BookmarkSearchState> {
  searchField = createRef();

  componentDidMount(): void {
    document.addEventListener('keydown', this.escapeKeyPressHandler);
    document.addEventListener('keydown', this.characterKeyPressHandler);

    this.focusInput();
  }

  componentWillUnmount(): void {
    document.removeEventListener('keydown', this.escapeKeyPressHandler);
    document.removeEventListener('keydown', this.characterKeyPressHandler);

    this.props.updateSearchResults(search(''));
  }

  private focusInput = (): void => {
    this.searchField.current.focus();
  };

  private characterKeyPressHandler = (event: KeyboardEvent) => {
    if (event.key.length !== 1) {
      return;
    }

    this.focusInput();
  };

  private escapeKeyPressHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.props.hideSearchBar();
    }
  };

  private resetHandler = () => {
    this.props.hideSearchBar();
  };

  private submitHandler = (event: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    event.preventDefault();

    this.openFirstSearchResult();
  };

  private openFirstSearchResult = () => {
    const { firstResult } = this.props;

    if (firstResult === null) {
      return;
    }

    window.location.href = firstResult.url;
  };

  private inputHandler = (event: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    this.props.updateSearchResults(search(event.currentTarget.value));
  };

  render() {
    return (
      <form className={s.bookmarkSearch} onReset={this.resetHandler} onSubmit={this.submitHandler}>
        <input ref={this.searchField} className={s.bookmarkSearchField} onChange={this.inputHandler} placeholder="Start typing to search bookmarks..." type="search" />
        <button className={s.bookmarkSearchCloseButton} title="Close search" type="reset">Close search</button>
      </form>
    );
  }
}

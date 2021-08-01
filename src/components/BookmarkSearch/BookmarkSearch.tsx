import {
  ChangeEventHandler, Component, createRef, FormEventHandler, ReactElement,
} from 'react';
import { Bookmark } from '../../bookmarks/Bookmark';
import { search } from '../../bookmarks/BookmarkManager';
import s from './BookmarkSearch.module.css';

interface BookmarkSearchProps {
  hideSearchBar: () => void;
  searchResults: Bookmark[];
  updateSearchResults: (bookmarks: Promise<Bookmark[]>) => Promise<void>;
}

export class BookmarkSearch extends Component<BookmarkSearchProps> {
  searchField = createRef<HTMLInputElement>();

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
    this.searchField.current?.focus();
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

  private resetHandler: FormEventHandler<HTMLFormElement> = () => {
    this.props.hideSearchBar();
  };

  private submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    this.openFirstSearchResult();
  };

  private openFirstSearchResult = () => {
    const { searchResults } = this.props;

    for (const bookmark of searchResults) {
      if (bookmark.type === 'link') {
        window.location.href = bookmark.url;

        break;
      }
    }
  };

  private inputHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    this.props.updateSearchResults(search(event.currentTarget.value));
  };

  render(): ReactElement {
    return (
      <form className={s.bookmarkSearch} onReset={this.resetHandler} onSubmit={this.submitHandler}>
        <input ref={this.searchField} className={s.bookmarkSearchField} onChange={this.inputHandler} placeholder="Start typing to search bookmarks..." type="search" />
        <button className={s.bookmarkSearchCloseButton} title="Close search" type="reset">Close search</button>
      </form>
    );
  }
}

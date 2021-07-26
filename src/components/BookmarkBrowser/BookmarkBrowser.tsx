import cn from 'classnames';
import { Component, createContext } from 'react';
import { createPortal } from 'react-dom';
import {
  Bookmark, BookmarkRootCategory, Folder,
} from '../../bookmarks/Bookmark';
import bookmarkClasses from '../Bookmark/Bookmark.module.css';
import { ClickPosition } from '../Bookmark/BookmarkFolder';
import { BookmarkCategory } from '../BookmarkCategory/BookmarkCategory';
import { BookmarkSearch } from '../BookmarkSearch/BookmarkSearch';
import { FolderPopup } from '../FolderPopup/FolderPopup';
import folderPopupClasses from '../FolderPopup/FolderPopup.module.css';
import s from './BookmarkBrowser.module.css';

export interface Popup {
  clickPosition: ClickPosition;
  folder: Folder;
}

interface BookmarkBrowserProps {
  bookmarkCategories: Promise<BookmarkRootCategory[]>;
}

interface BookmarkBrowserState {
  categories: BookmarkRootCategory[];
  loaded: boolean;
  openedPopups: Popup[];
  searchResults: Bookmark[];
  showSearchBar: boolean;
}

interface PopupContext {
  closeAllNextPopups: (folder: Folder) => void;
  closeAllPopups: () => void;
  isPopupOpened: (folder: Folder) => boolean;
  togglePopup: (folder: Folder, clickPosition: ClickPosition) => void;
}

export const Popups = createContext<PopupContext>({
  closeAllNextPopups: () => {},
  closeAllPopups: () => {},
  isPopupOpened: () => false,
  togglePopup: () => {},
});

export class BookmarkBrowser extends Component<BookmarkBrowserProps, BookmarkBrowserState> {
  state: BookmarkBrowserState = {
    categories: [],
    loaded: false,
    openedPopups: [],
    searchResults: [],
    showSearchBar: false,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.characterKeyPressHandler);
    document.addEventListener('keydown', this.searchHotkeyPressHandler);
    document.addEventListener('keydown', this.popupEscapeKeyPressHandler);
    document.addEventListener('click', this.closeAllPopupsHandler);
    window.addEventListener('resize', this.screenResizeHandler);

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
    document.removeEventListener('keydown', this.popupEscapeKeyPressHandler);
    document.removeEventListener('click', this.closeAllPopupsHandler);
    window.removeEventListener('resize', this.screenResizeHandler);
  }

  private closeAllPopupsHandler = (event: MouseEvent) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const isClickedOnBookmarkItem = event.target.closest(`.${bookmarkClasses.bookmarkItem}`) !== null;
    const isClickedOnFolderPopup = event.target.closest(`.${folderPopupClasses.folderPopup}`) !== null;

    if (isClickedOnBookmarkItem || isClickedOnFolderPopup) {
      return;
    }

    this.closeAllPopups();
  };

  private showSearchBar = () => {
    if (this.state.showSearchBar === false) {
      this.closeAllPopups();

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

  private screenResizeHandler = () => {
    this.closeAllPopups();
  };

  private hideSearchBar = (): void => {
    this.setState({
      showSearchBar: false,
    });
  };

  private updateSearchResults = async (searchResults: Promise<Bookmark[]>): Promise<void> => {
    searchResults.then((bookmarks) => {
      this.setState({
        searchResults: bookmarks,
      });
    });
  };

  private characterKeyPressHandler = (event: KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }

    if (event.key.length !== 1) {
      return;
    }

    this.showSearchBar();
  };

  private isPopupWithSameNestingLevelOpened = (folder: Folder) => this.state.openedPopups[folder.nestingLevel] !== undefined;

  private isPopupWithSameIdOpened = (folder: Folder) => this.state.openedPopups.findIndex((popup: Popup) => {
    const isPopup = (value: any): value is Popup => value instanceof Object;

    if (isPopup(popup) === false) {
      return false;
    }

    return popup.folder.idLocal === folder.idLocal;
  }) !== -1;

  private togglePopup = (folder: Folder, clickPosition: ClickPosition) => {
    this.setState((state) => {
      let { openedPopups } = state;

      if (this.isPopupWithSameNestingLevelOpened(folder)) {
        openedPopups = openedPopups.slice(0, folder.nestingLevel);
      }

      if (this.isPopupWithSameIdOpened(folder) === false) {
        openedPopups[folder.nestingLevel] = {
          clickPosition,
          folder,
        };
      }

      return {
        openedPopups,
      };
    });
  };

  private closeAllNextPopups = (folder: Folder) => {
    this.setState((state) => ({
      openedPopups: state.openedPopups.slice(0, folder.nestingLevel + 1),
    }));
  };

  private closeAllPopups = () => {
    this.setState({
      openedPopups: [],
    });
  };

  private popupEscapeKeyPressHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.state.openedPopups.length > 0) {
      this.setState((state) => {
        state.openedPopups.pop();

        return {
          openedPopups: state.openedPopups,
        };
      });
    }
  };

  render() {
    const mainClasses = cn(s.bookmarkBrowser, {
      [s.loading]: !this.state.loaded,
    });

    if (this.state.categories.length === 0) {
      return (
        <main className={mainClasses}>
          <p className={s.noBookmarksMessage}>
            Add your first bookmarks to get started with Camellia
          </p>
        </main>
      );
    }

    const context = {
      closeAllNextPopups: this.closeAllNextPopups,
      closeAllPopups: this.closeAllPopups,
      isPopupOpened: this.isPopupWithSameIdOpened,
      togglePopup: this.togglePopup,
    };

    const popupPortals = this.state.openedPopups.map((popup) => createPortal(
      <FolderPopup key={popup.folder.idLocal} clickPosition={popup.clickPosition} closeAllNextPopups={this.closeAllNextPopups} folder={popup.folder} />,
      document.body,
    ));

    if (this.state.showSearchBar) {
      return (
        <main className={mainClasses}>
          <Popups.Provider value={context}>
            <BookmarkSearch hideSearchBar={this.hideSearchBar} searchResults={this.state.searchResults} updateSearchResults={this.updateSearchResults} />
            <BookmarkCategory bookmarks={this.state.searchResults} categoryTitle="Search results" />

            { popupPortals }
          </Popups.Provider>
        </main>
      );
    }

    return (
      <main className={mainClasses}>
        <Popups.Provider value={context}>
          {this.state.categories.map((item) => (
            <BookmarkCategory key={item.idLocal} bookmarks={item.children} categoryTitle={item.title} />
          ))}

          { popupPortals }
        </Popups.Provider>
      </main>
    );
  }
}

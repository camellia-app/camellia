import { Component, h, render } from 'preact';
import { getTree } from './BrowserAPI/Bookmark';
import BookmarkCategory from './components/BookmarkCategory/BookmarkCategory';
import IndeterminateIndicator from './components/IndeterminateIndicator/IndeterminateIndicator';

import BookmarkTreeNode = browser.bookmarks.BookmarkTreeNode;

export interface AppProps {
  rootBookmarkTree: Promise<BookmarkTreeNode[]>;
}

export interface AppState {
  categories: BookmarkTreeNode[];
  loaded: boolean;
}

export default class App extends Component<AppProps, AppState> {
  constructor() {
    super();

    this.state = {
      categories: [],
      loaded: false,
    };
  }

  async componentDidMount() {
    this.props.rootBookmarkTree.then((rootBookmarkTree: BookmarkTreeNode[]) => {
      this.setState({
        categories: rootBookmarkTree[0].children,
        loaded: true,
      });
    });
  }

  render(props: AppProps, state: AppState) {
    if (state.loaded) {
      return state.categories.map((item) => (
        <BookmarkCategory key={item.id} bookmarks={item.children} categoryTitle={item.title} />
      ));
    }

    return (
      <IndeterminateIndicator />
    );
  }
}

render(
  <App rootBookmarkTree={getTree()} />,
  document.querySelector('#root'),
);

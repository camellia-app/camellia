if (process.env.NODE_ENV==='development') {
    require("preact/debug");
}

import BookmarkTreeNode = browser.bookmarks.BookmarkTreeNode;
import {render, h, Component} from 'preact';
import { getTree } from './BrowserAPI/Bookmark';
import BookmarkCategory from './components/BookmarkCategory';

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
            loaded: false,
            categories: [],
        };
    }

    async componentDidMount() {
        await this.props.rootBookmarkTree.then((rootBookmarkTree: BookmarkTreeNode[]) => {
            this.setState({
                categories: rootBookmarkTree[0].children,
                loaded: true,
            });
        });
    }

    render(props, state) {
        if (state.loaded) {
            return state.categories.map(item => (
                <BookmarkCategory bookmarks={item.children} categoryTitle={item.title}/>
            ));
        } else {
            return (
                <div>loading...</div>
            );
        }
    }
}

render(
    <App rootBookmarkTree={getTree()} />,
    document.querySelector('#root')
);

import {Component, h, Fragment} from 'preact';
import Bookmark from './Bookmark';
import BookmarkTreeNode = browser.bookmarks.BookmarkTreeNode;

export interface BookmarkCategoryProps {
    categoryTitle: string;
    bookmarks: BookmarkTreeNode[];
}

export default class BookmarkCategory extends Component<BookmarkCategoryProps> {
    render(props: BookmarkCategoryProps) {
        return (
            <section>
                <h2>{props.categoryTitle}</h2>
                <ul>
                    {props.bookmarks.map(item => (
                        <Bookmark bookmark={item} />
                    ))}
                </ul>

            </section>
        );
    }
}

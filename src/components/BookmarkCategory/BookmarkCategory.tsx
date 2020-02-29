import {Component, h, Fragment} from 'preact';
import Link from '../Bookmark/Link';
import BookmarkTreeNode = browser.bookmarks.BookmarkTreeNode;
import * as s from './BookmarkCategory.css';
import Folder from '../Bookmark/Folder';

export interface BookmarkCategoryProps {
    categoryTitle: string;
    bookmarks: BookmarkTreeNode[];
}

export default class BookmarkCategory extends Component<BookmarkCategoryProps> {
    render(props: BookmarkCategoryProps) {
        return (
            <section>
                <h2 class={s.bookmarkCategoryTitle}>{props.categoryTitle}</h2>
                <ul class={s.bookmarkList}>
                    {props.bookmarks.map(item => {
                      if (item.url !== undefined) {
                        return (
                          <Link bookmark={item} />
                        )
                      } else {
                        return (
                          <Folder bookmark={item} />
                        )
                      }
                    })}
                </ul>

            </section>
        );
    }
}

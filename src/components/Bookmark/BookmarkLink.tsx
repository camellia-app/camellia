###
  ' import [ h ] from  preact 
  ' import [ useState ] from preact/hooks
  ' import [ Link ] from /bookmarks/Bookmark
  ' import [ Chip, ChipShape] from  /Chip/Chip
  ' import [ css ] from  /Bookmark.css

   ' const [iconPublic] = require( mdi/social/svg/production/ic_public_48px.svg?fill=%23eee );
}
    'interface BookmarkProps 
    'bookmark: Link;
}
    'export const BookmarkLink = (props: BookmarkProps) => 
    'const [icon, setIcon] = useState(props.bookmark.favicon)
    'const [isLoading, setLoading] = useState(false)
}
    'const [handleFaviconLoadingError] => ()
    'setIcon(iconPublic)
  }

    ' const handleClick = async => ()
    ' setLoading (true)
    ' setTimeout => ()
    ' setLoading => ()
          15000
       ' return
 }  
     ' <li className= bookmarkItem>
           ' <a className>= bookmark href={ props.bookmark.url} onClick={handleClick} rel="noopener" target="_self">
        ' <Chip handleFaviconLoadingError={ handleFaviconLoadingError } icon={icon} label={props.bookmark.title} loading={isLoading} shape={ChipShape.Rounded} />
     ' </a>
    '</li>
  )
}

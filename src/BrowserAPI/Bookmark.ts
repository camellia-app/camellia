import BookmarkTreeNode = browser.bookmarks.BookmarkTreeNode;

const TREE: BookmarkTreeNode[] = [{
    'dateAdded': 1582445973099,
    'id': '0',
    'title': '',
    'children': [{
        'dateAdded': 1571581178397,
        'dateGroupModified': 1581865689971,
        'id': '1',
        'index': 0,
        'parentId': '0',
        'title': 'Bookmarks bar',
        'children': [{
            'dateAdded': 1479392653000,
            'id': '253',
            'index': 0,
            'parentId': '1',
            'title': 'VK',
            'url': 'https://vk.com'
        }, {
            'dateAdded': 1518531858000,
            'id': '254',
            'index': 1,
            'parentId': '1',
            'title': 'SoundCloud',
            'url': 'https://soundcloud.com/stream'
        }, {
            'dateAdded': 1541170312000,
            'id': '255',
            'index': 4,
            'parentId': '1',
            'title': 'YouTube Music',
            'url': 'https://music.youtube.com/'
        }, {
            'dateAdded': 1356033517000,
            'id': '264',
            'index': 5,
            'parentId': '1',
            'title': 'YouTube',
            'url': 'https://www.youtube.com/feed/subscriptions'
        }, {
            'dateAdded': 1524600861000,
            'id': '260',
            'index': 6,
            'parentId': '1',
            'title': 'ProtonMail',
            'url': 'https://mail.protonmail.com/login'
        }, {
            'dateAdded': 1560895989404,
            'id': '251',
            'index': 7,
            'parentId': '1',
            'title': 'Yandex.Tracker',
            'url': 'https://tracker.yandex.ru/dashboard/111'
        }, {
            'dateAdded': 1532447315000,
            'id': '249',
            'index': 8,
            'parentId': '1',
            'title': 'Android Messages',
            'url': 'https://messages.google.com/web/conversations'
        }],
    }, {
        'dateAdded': 1571581178397,
        'dateGroupModified': 1578356151626,
        'id': '2',
        'index': 1,
        'parentId': '0',
        'title': 'Other bookmarks',
        'children': [{
            'dateAdded': 1571581234833,
            'dateGroupModified': 1571581234833,
            'id': '5',
            'index': 0,
            'parentId': '2',
            'title': 'Google',
            'children': [{
                'dateAdded': 1498420296000,
                'id': '192',
                'index': 0,
                'parentId': '5',
                'title': 'Google Inbox',
                'url': 'https://inbox.google.com/'
            }, {
                'dateAdded': 1498599987000,
                'id': '276',
                'index': 1,
                'parentId': '5',
                'title': 'YouTube',
                'url': 'https://www.youtube.com/feed/subscriptions'
            }, {
                'dateAdded': 1497199497000,
                'id': '194',
                'index': 2,
                'parentId': '5',
                'title': 'Google Contacts',
                'url': 'https://contacts.google.com/'
            }, {
                'dateAdded': 1498778016000,
                'id': '195',
                'index': 3,
                'parentId': '5',
                'title': 'Google Photos',
                'url': 'https://photos.google.com/'
            }, {
                'dateAdded': 1451753587000,
                'id': '196',
                'index': 4,
                'parentId': '5',
                'title': 'Google Analytics',
                'url': 'https://analytics.google.com/'
            }, {
                'dateAdded': 1384889774000,
                'id': '197',
                'index': 5,
                'parentId': '5',
                'title': 'Google AdSense',
                'url': 'https://www.google.com/adsense/app#home'
            }, {
                'dateAdded': 1498420277000,
                'id': '198',
                'index': 6,
                'parentId': '5',
                'title': 'Google Drive',
                'url': 'https://drive.google.com/'
            }, {
                'dateAdded': 1498420337000,
                'id': '199',
                'index': 7,
                'parentId': '5',
                'title': 'Google PageSpeed Insights',
                'url': 'https://developers.google.com/speed/pagespeed/insights/'
            }, {
                'dateAdded': 1518895602000,
                'id': '304',
                'index': 8,
                'parentId': '5',
                'title': 'Google API Console',
                'url': 'https://console.developers.google.com/'
            }],
        }],
    }],
}];

export async function getTree(): Promise<BookmarkTreeNode[]> {
    return TREE;
}

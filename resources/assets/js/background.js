/*
|--------------------------------------------------------------------------
| Search bookmarks in omnibox
|--------------------------------------------------------------------------
|
| This event is fired each time the user updates the text in the omnibox,
| as long as the extension's keyword mode is still active.
*/

browser.omnibox.onInputChanged.addListener((text, suggest) => {
	Promise.all([
		browser.storage.local.get(),
		browser.storage.sync.get(),
		browser.bookmarks.getTree()
	])
	.then(([local_storage, sync_storage, browserBookmarks]) => {
		if (text.length <= 1) {
			return;
		}

        let allBookmarks = browserBookmarks[0]['children'][0]['children'].concat(
        	browserBookmarks[0]['children'][1]['children']
		);
		let flattedBookmarks = allBookmarks.flatten('children');

		let filteredBookmarks = flattedBookmarks.filter(item => {
			return item.title.toLowerCase().indexOf(text.toLowerCase()) !== -1
				  || item.url.toLowerCase().indexOf(text.toLowerCase()) !== -1;
		});

		if (filteredBookmarks.length === 0) {
			return;
		}

		let sortedBookmarks = filteredBookmarks.sort((a, b) => {
			a.clicks = typeof sync_storage['click_counter'][CryptoJS.MD5(a.url)] !== 'undefined'
					 ? sync_storage['click_counter'][a.url]
					 : 0;

			b.clicks = typeof sync_storage['click_counter'][CryptoJS.MD5(b.url)] !== 'undefined'
					 ? sync_storage['click_counter'][b.url]
					 : 0;

			return b.clicks - a.clicks;
		});

		let suggestions = [];

		sortedBookmarks.forEach((bookmark, index) => {
			let title = bookmark.title.encodeHTML();
			let url = bookmark.url.encodeHTML()
				.replace('http://', '')
				.replace('https://', '');

			if (title.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
				title = title.highlight(text, '<match>$1</match>');
			}

			if (url.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
				url = url.highlight(text, '<match>$1</match>');
			}

			let bookmarkMd5 = CryptoJS.MD5(bookmark.url);

			if (sync_storage['display_click_counter'] === true
			&& typeof sync_storage['click_counter'][bookmarkMd5] !== 'undefined'
			&& sync_storage['click_counter'][bookmarkMd5] > 0) {
				title += ' <dim>(' + sync_storage['click_counter'][bookmarkMd5] + ')</dim>';
			}

			suggestions.push({
				content: bookmark.id,
				description: title + ' <dim>—</dim> <url>' + url + '</url>'
			});
		});

		suggest(suggestions);
	})
	.catch(error => {
		browser.notifications.create({
			'type': 'basic',
			'iconUrl': '/img/logo/512x512-colored.png',
			'title': browser.i18n.getMessage('error_occured'),
			'message': error.message
		});
	});
});

/*
|--------------------------------------------------------------------------
| Opens bookmark from omnibox
|--------------------------------------------------------------------------
|
| This event fired when user selects any bookmark from omnibox.
*/

browser.omnibox.onInputEntered.addListener(bookmarkId => {
	if (bookmarkId.length === 0
	|| Number.isInteger(parseInt(bookmarkId)) === false) {
		return;
	}

	Promise.all([
		browser.storage.sync.get(),
		browser.storage.local.get(),
		browser.bookmarks.get(bookmarkId)
	])
	.then(([sync_storage, local_storage, browserBookmarks]) => {
		let bookmark = browserBookmarks[0];

		let bookmarkMd5 = CryptoJS.MD5(bookmark.url);

        sync_storage['click_counter'][bookmarkMd5] = typeof sync_storage['click_counter'][bookmarkMd5] !== 'undefined'
			? sync_storage['click_counter'][bookmarkMd5]
			: 0;

        sync_storage['click_counter'][bookmarkMd5]++;

		browser.storage.sync.set(sync_storage);

		if (sync_storage['bookmarks_in_new_tab'] === true) {
			browser.tabs.create({
				url: bookmark.url
			});
		} else {
			browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
				browser.tabs.update(tabs[0].id, {url: bookmark.url});
			});
		}

	})
	.catch(error => {
		browser.notifications.create({
			'type': 'basic',
			'iconUrl': '/img/logo/512x512-colored.png',
			'title': browser.i18n.getMessage('error_occured'),
			'message': error.message
		});
	});
});

/*
|--------------------------------------------------------------------------
| Setting up default settings
|--------------------------------------------------------------------------
|
| This settings sets up after each extenstion update and refresh
| if they`re not set.
*/

browser.runtime.onInstalled.addListener(details => {
	Promise.all([
		browser.storage.local.get(),
		browser.storage.sync.get()
	])
	.then(([local_storage, sync_storage]) => {

		/*
		|--------------------------------------------------------------------------
		| Syncronisable default settings
		|--------------------------------------------------------------------------
		|
		| This settings synced between all browsers using one account.
		*/

		// Sets installation date
		if (typeof sync_storage['installation_date'] === 'undefined'
		|| Number.isInteger(sync_storage['installation_date']) === false) {
			sync_storage['installation_date'] = Date.now();
		}

		// True if beg to rate extenstion as already displayed
		if (typeof sync_storage['vote_remind_displayed'] === 'undefined'
		|| typeof sync_storage['vote_remind_displayed'] !== 'boolean') {
			sync_storage['vote_remind_displayed'] = false;
		}

		// Object with bookmark click counter
		if (typeof sync_storage['click_counter'] === 'undefined'
				|| typeof sync_storage['click_counter'] !== 'object') {
				sync_storage['click_counter'] = {};
		}

		// Background wallpaper
		if (typeof sync_storage['background_image'] === 'undefined'
			|| typeof sync_storage['background_image'] !== 'string') {
			sync_storage['background_image'] = local_storage['background_image'] !== undefined
				? local_storage['background_image']
				: DEFAULT_WALLPAPER_URL;
		}

		// Background brightness
		if (typeof sync_storage['background_brightness'] === 'undefined'
			|| typeof sync_storage['background_brightness'] !== 'number') {
			sync_storage['background_brightness'] = local_storage['background_brightness'] !== undefined
				? local_storage['background_brightness']
				: 0.5;
		}

		// Opens all links in new tab
		if (typeof sync_storage['bookmarks_in_new_tab'] === 'undefined'
			|| typeof sync_storage['bookmarks_in_new_tab'] !== 'boolean') {
			sync_storage['bookmarks_in_new_tab'] = local_storage['bookmarks_in_new_tab'] !== undefined
				? local_storage['bookmarks_in_new_tab']
				: false;
		}

		// Enables and disabled text selecting
		if (typeof sync_storage['user_select'] === 'undefined'
			|| typeof sync_storage['user_select'] !== 'boolean') {
			sync_storage['user_select'] = local_storage['user_select'] !== undefined
				? local_storage['user_select']
				: false;
		}

		// Shows and hides click counter
		if (typeof sync_storage['display_click_counter'] === 'undefined'
			|| typeof sync_storage['display_click_counter'] !== 'boolean') {
			sync_storage['display_click_counter'] = local_storage['display_click_counter'] !== undefined
				? local_storage['display_click_counter']
				: true;
		}

		/*
		|--------------------------------------------------------------------------
		| Local default settings
		|--------------------------------------------------------------------------
		|
		| This settings may be set individually for each browser.
		*/

		// Number of columns
		if (typeof local_storage['columns_count'] === 'undefined'
		|| Number.isInteger(local_storage['columns_count']) === false) {
			local_storage['columns_count'] = 6;
		}

		// Use native OS scroll bar or designed pure CSS version
		if (typeof local_storage['use_custom_scrollbar'] === 'undefined'
		|| typeof local_storage['use_custom_scrollbar'] !== 'boolean') {
			local_storage['use_custom_scrollbar'] = true;
		}

		// Enables and disabled text selecting
		if (typeof local_storage['font_size'] === 'undefined'
		|| Number.isInteger(local_storage['font_size']) === false) {
			local_storage['font_size'] = 16;
		}

		// Display top sites block
		if (typeof local_storage['top_sites'] === 'undefined'
		|| typeof local_storage['top_sites'] !== 'boolean') {
			local_storage['top_sites'] = false;
		}

		// Display recently closed tabs
		if (typeof local_storage['recently_closed'] === 'undefined'
		|| typeof local_storage['recently_closed'] !== 'boolean') {
			local_storage['recently_closed'] = false;
		}

		browser.storage.sync.set(sync_storage);
		browser.storage.local.set(local_storage);
	})
	.catch(error => {
		browser.notifications.create({
			'type': 'basic',
			'iconUrl': '/img/logo/512x512-colored.png',
			'title': browser.i18n.getMessage('error_occured'),
			'message': error.message
		});
	});
});

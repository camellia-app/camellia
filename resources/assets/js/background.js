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

		let allBookmarks     = browserBookmarks[0]['children'][0]['children'];
		let flattedBookmarks = allBookmarks.flatten('children');

		let filteredBookmarks = flattedBookmarks.filter(item => {
			return item.title.toLowerCase().indexOf(text.toLowerCase()) !== -1
				  || item.url.toLowerCase().indexOf(text.toLowerCase()) !== -1;
		});

		if (filteredBookmarks.length === 0) {
			return;
		}

		let sortedBookmarks = filteredBookmarks.sort((a, b) => {
			a.clicks = typeof sync_storage['click_counter'][a.id] !== 'undefined'
					 ? sync_storage['click_counter'][a.id]
					 : 0;

			b.clicks = typeof sync_storage['click_counter'][b.id] !== 'undefined'
					 ? sync_storage['click_counter'][b.id]
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

			if (local_storage['display_click_counter'] === true
			&& typeof sync_storage['click_counter'][bookmark.id] !== 'undefined'
			&& sync_storage['click_counter'][bookmark.id] > 0) {
				title += ' <dim>(' + sync_storage['click_counter'][bookmark.id] + ')</dim>';
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

		sync_storage['click_counter'][bookmark.id] = typeof sync_storage['click_counter'][bookmark.id] !== 'undefined'
			? sync_storage['click_counter'][bookmark.id]
			: 0;

		sync_storage['click_counter'][bookmark.id]++;

		browser.storage.sync.set(sync_storage);

		if (local_storage['bookmarks_in_new_tab'] === true) {
			browser.tabs.create({
				url: bookmark.url
			});
		} else {
			browser.tabs.query({active: true, currentWindow: true})
			.then(tabs => {
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
		| This settings synced between all browsers usign one account.
		*/

		// Object with bookmark click counter
		if (typeof sync_storage['click_counter'] === 'undefined'
		|| typeof sync_storage['click_counter'] !== 'object') {
			sync_storage['click_counter'] = {};
		}

		for (let bookmark in sync_storage['click_counter']) {
			if (sync_storage['click_counter'][bookmark] === 0) {
				delete sync_storage['click_counter'][bookmark];
			}
		}

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

		// Background wallpaper
		if (typeof local_storage['background_image'] === 'undefined'
		|| typeof local_storage['background_image'] !== 'string') {
			local_storage['background_image'] = '/img/wallpaper.jpg';
		}

		// Display number of clicks at each bookmark
		if (typeof local_storage['display_click_counter'] === 'undefined'
		|| typeof local_storage['display_click_counter'] !== 'boolean') {
			local_storage['display_click_counter'] = true;
		}

		// Enables and disabled text selecting
		if (typeof local_storage['user_select'] === 'undefined'
		|| typeof local_storage['user_select'] !== 'boolean') {
			local_storage['user_select'] = true;
		}

		// Enables and disabled text selecting
		if (typeof local_storage['font_size'] === 'undefined'
		|| Number.isInteger(local_storage['font_size']) === false) {
			local_storage['font_size'] = 16;
		}

		// Opens all links in new tab
		if (typeof local_storage['bookmarks_in_new_tab'] === 'undefined'
		|| typeof local_storage['bookmarks_in_new_tab'] !== 'boolean') {
			local_storage['bookmarks_in_new_tab'] = false;
		}

		// Display top sites block
		if (typeof local_storage['top_sites'] === 'undefined'
		|| typeof local_storage['top_sites'] !== 'boolean') {
			local_storage['top_sites'] = false;
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

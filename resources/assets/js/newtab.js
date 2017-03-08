'use strict';

/*
|--------------------------------------------------------------------------
| Async wrapper
|--------------------------------------------------------------------------
|
| Here is all logic that requires data from async functions.
*/

Promise.all([
	browser.storage.local.get(),
	browser.storage.sync.get(),
	browser.bookmarks.getTree(),
	browser.management.getSelf(),
	browser.topSites.get(),
	browser.sessions.getRecentlyClosed()
])
.then(([local_storage, sync_storage, browserBookmarks, extensionInfo, topSites, recentlyClosed]) => {
	let allBookmarks          = browserBookmarks[0]['children'][0]['children'];
	let columnsCount          = local_storage['columns_count'];
	let backgroundImage       = local_storage['background_image'];
	let openBookmarksInNewTab = local_storage['bookmarks_in_new_tab'];
	let allTopSites           = local_storage['top_sites'] === true ? topSites : [];
	let backgroundBrightness  = local_storage['background_brightness'];

	//
	// Preparing recently closed tabs
	//

	let allClosedTabs = [];

	if (local_storage['recently_closed'] === true) {
		recentlyClosed.forEach(closedTab => {
			if (typeof closedTab['tab'] !== 'undefined'
			&& typeof closedTab['tab']['title'] !== 'undefined'
			&& typeof closedTab['tab']['url'] !== 'undefined') {
				allClosedTabs.push({
					title: closedTab['tab']['title'],
					url:   closedTab['tab']['url']
				});
			}
		});
	}

	console.log(allClosedTabs);

	/*
	|--------------------------------------------------------------------------
	| Application top level wrapper
	|--------------------------------------------------------------------------
	|
	| Runs fade in transition when DOM is ready by Vue.
	*/

	Vue.component('app', {
		data: function () {
			return {
				show: false
			};
		},
		mounted: function () {
			this.show = true;
		},
		template: `<transition name="fade">
				<div class="flex-app-container"
				v-if="show">
					<slot></slot>
				</div>
			</transition>`,
	});

	/*
	|--------------------------------------------------------------------------
	| Application main content
	|--------------------------------------------------------------------------
	|
	| Wrapper for application main content.
	*/

	Vue.component('app-content', {
		data: function () {
			return {
				allBookmarks:          allBookmarks,
				chunkedBookmarks:      allBookmarks.chunk(columnsCount, true),
				allTopSites:           allTopSites,
				chunkedTopSites:       allTopSites.chunk(columnsCount, true),
				allClosedTabs:         allClosedTabs,
				chunkedClosedTabs:     allClosedTabs.chunk(columnsCount, true),
				openBookmarksInNewTab: openBookmarksInNewTab,
				columnSize:            Math.round(COLUMN_COUNT / columnsCount),

				locale: i18nObject([
					'add_bookmarks_to_browser'
				])
			};
		},
		template: `<main>
				<ul class="bookmark-tree row pb-1"
				v-if="allClosedTabs.length > 0">
					<bookmark-column
					v-for="site in chunkedClosedTabs"
					:key="site.id"
					:bookmarks="site"></bookmark-column>
				</ul>

				<ul class="bookmark-tree row pb-1"
				v-if="allTopSites.length > 0">
					<bookmark-column
					v-for="site in chunkedTopSites"
					:key="site.id"
					:bookmarks="site"></bookmark-column>
				</ul>

				<ul class="bookmark-tree row"
				v-if="allBookmarks.length > 0">
					<bookmark-column
					v-for="bookmarks in chunkedBookmarks"
					:key="bookmarks.id"
					:bookmarks="bookmarks"></bookmark-column>
				</ul>
				<div class="py-3 pl-1 text-xs-center lead"
				v-else
				v-html="locale.add_bookmarks_to_browser"></div>
			</main>`
	});

	/*
	|--------------------------------------------------------------------------
	| Application footer
	|--------------------------------------------------------------------------
	|
	| Simple footer with links.
	*/

	Vue.component('app-footer', {
		data: function () {
			return {
				issuesUrl:      extensionInfo.homepageUrl + '/issues',
				releasesUrl:    extensionInfo.homepageUrl + '/releases',
				optionsUrl:     'chrome://extensions/?options=' + extensionInfo.id,
				browserVersion: 'v' + extensionInfo.version,
				isDevBuild:     extensionInfo.installType === 'development',
				locale:         i18nObject([
					'search', 'manage_bookmarks', 'options', 'help', 'report_bug', 'extensions'
				])
			};
		},
		template: `<footer>
				<ul class="list-inline float-md-right w-100 mb-0">
					<li class="list-inline-item float-md-left">
						<a data-toggle="modal" data-target="#modal-search" tabindex="0">{{ locale.search }}</a>
					</li>
					<li class="list-inline-item float-md-left">
						<a href="chrome://bookmarks">{{ locale.manage_bookmarks }}</a>
					</li>
					<li class="list-inline-item">
						<a href="chrome://extensions">{{ locale.extensions }}</a>
					</li>
					<li class="list-inline-item">
						<a
						:href="optionsUrl">{{ locale.options }}</a>
					</li>
					<li class="list-inline-item">
						<a data-toggle="modal" data-target="#modal-help" tabindex="0">{{ locale.help }}</a>
					</li>
					<li class="list-inline-item">
						<a
						:href="issuesUrl">{{ locale.report_bug }}</a>
					</li>
					<li class="list-inline-item">
						<a
						:href="releasesUrl">{{ browserVersion }}</a>

						<template v-if="isDevBuild">
							(dev)
						</template>
					</li>
				</ul>
			</footer>`
	});

	/*
	|--------------------------------------------------------------------------
	| Bookmarks search modal window
	|--------------------------------------------------------------------------
	|
	| This component uses Bootstrap 4 alpha 5 modal window:
	| http://v4-alpha.getbootstrap.com/components/modal/
	|
	| Searches over all bookmarks and hides unrelevant results. Based
	| on Vue 2 Staggering List Transitions example from docs:
	| https://vuejs.org/v2/guide/transitions.html#Staggering-List-Transitions
	*/

	Vue.component('modal-search', {
		data: function () {
			return {
				query:     '',
				bookmarks: allBookmarks.flatten('children'),
				locale:    i18nObject([
					'search_bookmarks', 'enter_bookmark_query', 'close'
				])
			};
		},
		computed: {
			filteredBookmarks: function () {
				return this.bookmarks.filter(bookmark => {
					return bookmark.title.toLowerCase().indexOf(this.query.toLowerCase()) !== -1;
				});
			}
		},
		methods: {
			enter: function (element) {
				element.removeAttribute('hidden');
			},
			leave: function (element) {
				element.setAttribute('hidden', true);
			},
		},
		template: `<div class="modal fade" id="modal-search" tabindex="-1" role="dialog" aria-labelledby="modal-search-label" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
						:aria-label="locale.close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h2 class="h4 modal-title text-truncate" id="modal-search-label">
							{{ locale.search_bookmarks }} <kbd><kbd>Ctrl</kbd> + <kbd>F</kbd></kbd>
						</h2>
					</div>
					<div class="modal-body">
						<form class="mb-1"
						@submit.prevent>
							<input type="text" class="form-control" autofocus required
							:placeholder="locale.enter_bookmark_query"
							v-model="query">
						</form>

						<transition-group class="bookmark-tree"
						name="staggered-fade"
						tag="ul"
						:css="false"
						@enter="enter"
						@leave="leave">
							<bookmark
							v-for="bookmark in filteredBookmarks"
							:key="bookmark.id"
							:bookmark="bookmark"></bookmark>
						</transition-group>
					</div>
				</div>
			</div>
		</div>`
	});

	/*
	|--------------------------------------------------------------------------
	| Help modal window
	|--------------------------------------------------------------------------
	|
	| This component uses Bootstrap 4 alpha 5 modal window:
	| http://v4-alpha.getbootstrap.com/components/modal/
	|
	| This modal simply contain FAQ.
	*/

	Vue.component('modal-help', {
		data: function () {
			return {
				currentQuestion: -1,
				faq: [{
					'title': browser.i18n.getMessage('help_reason_to_use_title'),
					'answer': browser.i18n.getMessage('help_reason_to_use_answer')
				}, {
					'title': browser.i18n.getMessage('help_omnibox_search_title'),
					'answer': browser.i18n.getMessage('help_omnibox_search_answer', [
						browser.runtime.getManifest().omnibox.keyword
					])
				}, {
					'title': browser.i18n.getMessage('help_which_browsers_supported_title'),
					'answer': browser.i18n.getMessage('help_which_browsers_supported_answer')
				}, {
					'title': browser.i18n.getMessage('help_why_permissions_title'),
					'answer': browser.i18n.getMessage('help_why_permissions_answer')
				}, {
					'title': browser.i18n.getMessage('help_request_permissions_title'),
					'answer': browser.i18n.getMessage('help_request_permissions_answer')
				}, {
					'title': browser.i18n.getMessage('help_change_theme_title'),
					'answer': browser.i18n.getMessage('help_change_theme_answer')
				}, {
					'title': browser.i18n.getMessage('help_screenshots_title'),
					'answer': browser.i18n.getMessage('help_screenshots_answer')
				}, {
					'title': browser.i18n.getMessage('help_manage_bookmarks_title'),
					'answer': browser.i18n.getMessage('help_manage_bookmarks_answer')
				}, {
					'title': browser.i18n.getMessage('help_planned_features_title'),
					'answer': browser.i18n.getMessage('help_planned_features_answer', [
						browser.runtime.getManifest().homepage_url + '/projects'
					])
				}, {
					'title': browser.i18n.getMessage('help_ctrl_f_title'),
					'answer': browser.i18n.getMessage('help_ctrl_f_answer')
				}, {
                    'title': browser.i18n.getMessage('help_background_author_title'),
                    'answer': browser.i18n.getMessage('help_background_author_answer')
                }],
				locale: i18nObject([
					'close', 'help', 'back_to_questions'
				])
			}
		},
		methods: {
			viewAnswer: function (index) {
				this.currentQuestion = index;
			},
			viewQuestions: function () {
				this.currentQuestion = -1;
			},
		},
		template: `<div class="modal fade" id="modal-help" tabindex="-1" role="dialog" aria-labelledby="modal-help-label" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
							:aria-label="locale.close">
								<span aria-hidden="true">&times;</span>
							</button>
							<h2 class="h4 modal-title text-truncate" id="modal-help-label">
								{{ locale.help }}
							</h2>
						</div>
						<div class="modal-body">
							<transition class="modal-body"
							tag="div"
							name="fade-faster"
							mode="out-in">
								<ol
								v-if="currentQuestion < 0">
									<li	v-for="(question, index) in faq"
									:key="index">
										<a class="underlined" tabindex="0"
										v-html="question.title"
										@click="viewAnswer(index)"></a>
									</li>
								</ol>
								<div
								v-else>
									<div
									v-for="(question, index) in faq"
									:key="index"
									v-if="index === currentQuestion">
										<h3 class="h5 pb-1"
										v-html="question.title"></h3>

										<div
										v-html="question.answer"></div>

										<div class="text-xs-right mt-1">
											<a class="underlined" tabindex="0"
											@click="viewQuestions">{{ locale.back_to_questions }}</a>
										</div>
									</div>
								</div>
							</transition>
						</div>
					</div>
				</div>
			</div>`
	});

	/*
	|--------------------------------------------------------------------------
	| Rate extension modal window
	|--------------------------------------------------------------------------
	|
	| This component uses Bootstrap 4 alpha 5 modal window:
	| http://v4-alpha.getbootstrap.com/components/modal/
	|
	| Automatically pops up when user opens new tab first time after
	| using the extension 2 weeks.
	*/

	Vue.component('modal-vote-remind', {
		data: function () {
			return {
				locale: i18nObject([
					'close', 'rate_extension', ['rate_extension_description', 'https://chrome.google.com/webstore/detail/' + browser.i18n.getMessage('@@extension_id')]
				])
			}
		},
		mounted: function () {
			if (sync_storage['vote_remind_displayed'] === false
			&& sync_storage['installation_date'] + 1000 * 60 * 60 * 24 * 14 < Date.now()) {
				$('#modal-vote-remind').modal('show');

				browser.storage.sync.set({vote_remind_displayed: true});
			}
		},
		template: `<div class="modal fade" id="modal-vote-remind" tabindex="-1" role="dialog" aria-labelledby="modal-vote-remind-label" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
							:aria-label="locale.close">
								<span aria-hidden="true">&times;</span>
							</button>
							<h2 class="h4 modal-title text-truncate" id="modal-vote-remind-label">
								{{ locale.rate_extension }}
							</h2>
						</div>
						<div class="modal-body"
						v-html="locale.rate_extension_description">
						</div>
					</div>
				</div>
			</div>`
	});

	/*
	|--------------------------------------------------------------------------
	| Main page columns
	|--------------------------------------------------------------------------
	|
	| This component gets bookmarks array splitted in N sub-arrays
	| and inserts all sub-arrays in columns at main page. 
	*/

	Vue.component('bookmark-column', {
		props: {
			bookmarks: Array
		},
		data: function () {
			return {
				columnSize: Math.round(COLUMN_COUNT / columnsCount)
			};
		},
		template: `<li
			:class="'col-xs-' + columnSize">
				<ul>
					<bookmark
					v-for="bookmark in bookmarks"
					:key="bookmark.id"
					:bookmark="bookmark"></bookmark>
				</ul>
			</li>`
	});

	/*
	|--------------------------------------------------------------------------
	| Bookmark tree
	|--------------------------------------------------------------------------
	|
	| This component uses Bootstrap 4 alpha 5 collapse:
	| http://v4-alpha.getbootstrap.com/components/collapse/
	|
	| Displays nested tree with folders and bookmarks. Based
	| on Vue 2 Tree View example from docs:
	| https://vuejs.org/v2/examples/tree-view.html
	*/

	Vue.component('bookmark', {
		props: {
			bookmark: Object
		},
		data: function () {
			return {
				clicksCount:           local_storage['click_counter'],
				displayClickCounter:   local_storage['display_click_counter'],
				openBookmarksInNewTab: openBookmarksInNewTab
			};
		},
		computed: {
			isFolder: function () {
				return typeof this.bookmark.children === 'object';
			},
			isBookmark: function () {
				return this.isFolder === false
					&& typeof this.bookmark.id !== 'undefined';
			},
			isLink: function () {
				return this.isBookmark === false
					&& this.isFolder === false;
			},

			getHref: function () {
				return this.isFolder === true
					//? ('#collapse-id-' + this.bookmark.id)
					? false
					: this.bookmark.url;
			},
			getTarget: function () {
				if (this.isFolder === true) {
					return false;
				}

				return this.openBookmarksInNewTab === true
					? '_blank'
					: '_self';
			},
			getClass: function () {
				return this.isFolder === true
					? 'folder'
					: false;
			},
			getStyle: function () {
				if (this.isFolder === true) {
					return false;
				}

				return {
					'background-image': 'url(chrome://favicon/' + this.bookmark.url + ')'
				};
			},
			getDataToggle: function () {
				return this.isFolder === true ? 'collapse' : false;
			},
			getDataTarget: function () {
				return this.isFolder === true
					? ('#collapse-id-' + this.bookmark.id)
					: false;
			},


			getListClass: function () {
				return this.isFolder === true
					? 'collapse'
					: false;
			},
			getListId: function () {
				return this.isFolder === true
					? ('collapse-id-' + this.bookmark.id)
					: false;
			}
		},
		methods: {
			incClicksCount: function (event) {
				if (event.which !== 1 && event.which !== 2) {
					return;
				}

				if (this.isBookmark === false) {
					return;
				}
				
				this.clicksCount[this.bookmark.id]++;
				browser.storage.local.set({click_counter: this.clicksCount});
			},
			getClicksCount: function () {
				if (this.isFolder === true
				|| this.isLink === true
				|| this.displayClickCounter === false) {
					return false;
				}
				
				this.clicksCount[this.bookmark.id] =
					typeof this.clicksCount[this.bookmark.id] !== 'undefined'
						? this.clicksCount[this.bookmark.id].roundThousands()
						: '';

				return this.clicksCount[this.bookmark.id];
			},
		},
		template: `<li>
				<a tabindex="0"
				:class="getClass"
				:title="bookmark.title"
				:style="getStyle"
				:href="getHref"
				:target="getTarget"
				:data-toggle="getDataToggle"
				:data-target="getDataTarget"
				:data-counter="getClicksCount()"

				@mouseup="incClicksCount">
					{{bookmark.title}}
				</a>

				<ul
				:class="getListClass"
				:id="getListId"
				v-if="isFolder">
					<bookmark
					v-for="bookmark in bookmark.children"
					:key="bookmark.id"
					:bookmark="bookmark"></bookmark>
				</ul>
			</li>`
	});

	const app = new Vue({
		el: '#app'
	});

	$('<img>').attr('src', backgroundImage)
	.on('load', function() {
		$(this).remove();

		$('#configurable-styles')
		.append(`body:before { background-image: url(${backgroundImage}); opacity: ${backgroundBrightness}; }`);
	})
	.on('error', function() {
		$('#configurable-styles')
		.append(`body:before { background-color: rgb(255,255,255); opacity: ${backgroundBrightness}; }`);
		
		browser.notifications.create({
			'type': 'basic',
			'iconUrl': '/img/logo/512x512-colored.png',
			'title': browser.i18n.getMessage('background_loading_error_title'),
			'message': browser.i18n.getMessage('background_loading_error_message')
		});
	});

	// Style scrollbar
	if (local_storage['use_custom_scrollbar'] === false) {
		$('body').removeClass('custom-scrollbar');
	}

	// User select
	if (local_storage['user_select'] === true) {
		$('body').removeClass('disabled-user-select');
	}

	// Set font size
	$('#configurable-styles').append(`body { font-size: ${local_storage['font_size']}px; }`);
})
.catch(error => {
	browser.notifications.create({
		'type': 'basic',
		'iconUrl': '/img/logo/512x512-colored.png',
		'title': browser.i18n.getMessage('error_occured'),
		'message': error.message
	});
});

/*
|--------------------------------------------------------------------------
| ...
|--------------------------------------------------------------------------
|
| Here is all logic that doesn`t not require data from async functions.
*/

$(document).on('shown.bs.modal', '.modal', function () {
	$(this).find('[autofocus]').focus();
});

$(document).on('click', '[href^="chrome://"]', function (event) {
	event.preventDefault();
	
	browser.tabs.create({
		url: $(this).attr('href')
	});
});

$(window).on('keydown', function (event) {
	if (event.keyCode === 114 || (event.ctrlKey && event.keyCode === 70)) { 
		event.preventDefault();

		$('.modal').not('#modal-search').modal('hide'); // Hide all modals but search modal
		$('#modal-search').modal('toggle');
	}
});

$('html').attr('lang', browser.i18n.getMessage('locale'));
$('title').text(browser.i18n.getMessage('new_tab'));

/*
|--------------------------------------------------------------------------
| Google Analytics
|--------------------------------------------------------------------------
*/

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-63968909-6', 'auto');

ga('set', 'appName', browser.runtime.getManifest().name);
ga('set', 'appVersion', browser.runtime.getManifest().version);
ga('set', 'appId', browser.i18n.getMessage('@@extension_id'));

ga('send', 'pageview');

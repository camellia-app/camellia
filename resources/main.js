import './assets/js/_functions';
import './assets/js/_variables';
import Vue from 'vue';
import Vuex from 'vuex';
import App from './templates/NewTab.vue';

function getAllInfo() {
	return Promise.all([
		browser.storage.local.get(),
		browser.storage.sync.get(),
		browser.bookmarks.getTree(),
		browser.management.getSelf(),
		browser.topSites.get(),
		browser.sessions.getRecentlyClosed()
	]);
};


export async function initPage() {
	const a = await getAllInfo();
	let [local_storage, sync_storage, browserBookmarks, extensionInfo, topSites, recentlyClosed] = a;
	let allBookmarks = browserBookmarks[0]['children'][0]['children'];
	let columnsCount = local_storage['columns_count'];
	let backgroundImage = local_storage['background_image'];
	let openBookmarksInNewTab = local_storage['bookmarks_in_new_tab'];
	let allTopSites = local_storage['top_sites'] === true ? topSites : [];
	let backgroundBrightness = local_storage['background_brightness'];

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

	const data = {
		local_storage,
		sync_storage,
		browserBookmarks,
		extensionInfo,
		topSites,
		recentlyClosed,
		allBookmarks,
		columnsCount,
		backgroundImage,
		openBookmarksInNewTab,
		allTopSites,
		backgroundBrightness
	};
	
	return data;
};


Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		bs: {},
		count: 0
	},
	getters: {
		count: state => state.count,
		bs: store => store.bs
	},
	actions: {
		getData ({ commit }) {
			initPage().then(r => {
				commit('syncData', r);
			});
		}
	},
	mutations: {
		increment (state) {
			state.count++
		},
		syncData (state, data) {
			state.bs = {
				...state.bs,
				...data
			}
		}
	}
})


new Vue({
	el: '#app',
	store,
	render: h => h(App)
});
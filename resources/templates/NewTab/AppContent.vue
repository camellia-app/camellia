<template>
	<main>
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
		v-html="locale.add_bookmarks_to_browser">
		</div>
		{{ allBookmarks }}
	</main>
</template>

<script>
import { initPage } from '../../main';

// const data = function() {
// 	return {
// 		allBookmarks: allBookmarks,
// 		chunkedBookmarks: allBookmarks.chunk(columnsCount, true),
// 		allTopSites: allTopSites,
// 		chunkedTopSites: allTopSites.chunk(columnsCount, true),
// 		allClosedTabs: allClosedTabs,
// 		chunkedClosedTabs: allClosedTabs.chunk(columnsCount, true),
// 		openBookmarksInNewTab: openBookmarksInNewTab,
// 		columnSize: Math.round(COLUMN_COUNT / columnsCount),

// 		locale: i18nObject([
// 			'add_bookmarks_to_browser'
// 		])
// 	};
// };

export default {
	// data
	asyncComputed: {
		allBookmarks () {
			return initPage().then(r => r.allBookmarks);
		},
		chunkedBookmarks () {
			return initPage().then(r => allBookmarks.chunk(12, true));
		},
		allTopSites () {
			return initPage().then(r => allTopSites);
		},
		chunkedTopSites () {
			return initPage().then(r => allTopSites.chunk(12, true));
		},
		allClosedTabs () {
			return initPage().then(r => allClosedTabs);
		},
		chunkedClosedTabs () {
			return initPage().then(r => allClosedTabs.chunk(12, true));
		},
		openBookmarksInNewTab () {
			return initPage().then(r => openBookmarksInNewTab);
		}
	}
};
</script>
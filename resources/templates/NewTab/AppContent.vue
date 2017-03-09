<template>
	<main>
		<!--<ul class="bookmark-tree row pb-1"
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
		</div>-->
	</main>
</template>

<script>
// const data = function() {
// 	return {
// 		allBookmarks
// 		// chunkedBookmarks:      this.allBookmarks.chunk(columnsCount, true),
// 		// allTopSites:           this.allTopSites,
// 		// chunkedTopSites:       this.allTopSites.chunk(columnsCount, true),
// 		allClosedTabs:         this.allClosedTabs,
// 		// chunkedClosedTabs:     this.allClosedTabs.chunk(columnsCount, true),
// 		// openBookmarksInNewTab: this.openBookmarksInNewTab,
// 		// columnSize:            Math.round(COLUMN_COUNT / columnsCount),

// 		// locale: i18nObject([
// 		// 	'add_bookmarks_to_browser'
// 		// ])
// 	};
// };

export default {
	// data
};
</script>
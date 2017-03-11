<template>
	<main>
		<ul class="bookmark-tree row pb-1"
			v-if="allClosedTabs.length > 0">
			<bookmark-column
			v-for="site in chunkedClosedTabs"
			:key="site.id"
			:bookmarks="site"
			:column-size="columnSize"></bookmark-column>
		</ul>

		<ul class="bookmark-tree row pb-1"
			v-if="allTopSites.length > 0">
			<bookmark-column
			v-for="site in chunkedTopSites"
			:key="site.id"
			:bookmarks="site"
			:column-size="columnSize"></bookmark-column>
		</ul>

		<ul class="bookmark-tree row"
			v-if="allBookmarks.length > 0">
			<bookmark-column
			v-for="bookmarks in chunkedBookmarks"
			:key="bookmarks.id"
			:bookmarks="bookmarks"
			:column-size="columnSize"></bookmark-column>
		</ul>
		
		<div class="py-3 pl-1 text-xs-center lead"
		v-else
		v-html="locale.add_bookmarks_to_browser">
		</div>
	</main>
</template>

<script>
import { mapGetters } from 'vuex';
import { COLUMN_COUNT } from '../../constants/constants';
import { i18nObject } from '../../assets/js/_functions';
import BookmarkColumn from './BookmarkColumn';

const data = function() {
	return {
		allBookmarks: [],
		chunkedBookmarks: [],
		allTopSites: [],
		chunkedTopSites: [],
		allClosedTabs: [],
		chunkedClosedTabs: [],
		openBookmarksInNewTab: null,
		columnSize: null,

		locale: i18nObject([
			'add_bookmarks_to_browser'
		])
	};
};

const computed = mapGetters(['bs']);

const methods = {
	mapBsToData (bs) {
		this.allBookmarks = bs.allBookmarks;
		this.chunkedBookmarks = bs.allBookmarks.chunk(bs.columnsCount, true);
		this.allTopSites = bs.allTopSites;
		this.chunkedTopSites = bs.allTopSites.chunk(bs.columnsCount, true);
		this.allClosedTabs = bs.allClosedTabs;
		this.chunkedClosedTabs = bs.allClosedTabs.chunk(bs.columnsCount, true);
		this.openBookmarksInNewTab = bs.openBookmarksInNewTab;
		this.columnSize = Math.round(COLUMN_COUNT / bs.columnsCount);
	}
}

const watch = {
	bs: {
		handler() {
			this.mapBsToData (this.bs);
		}
	}
};

const components = {
	BookmarkColumn
}

export default {
	computed,
	methods,
	watch,
	data,
	components
};
</script>
<template>
	<div class="modal fade" id="modal-search" tabindex="-1" role="dialog" aria-labelledby="modal-search-label" aria-hidden="true">
		пусто
		<!--<div class="modal-dialog" role="document">
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
		</div>-->
	</div>
</template>

<script>
const data = function() {
	return {
			query:     '',
			bookmarks: allBookmarks.flatten('children'),
			locale:    i18nObject([
				'search_bookmarks', 'enter_bookmark_query', 'close'
			])
		};
};

const computed = {
	filteredBookmarks: function () {
		return this.bookmarks.filter(bookmark => {
			return bookmark.title.toLowerCase().indexOf(this.query.toLowerCase()) !== -1;
		});
	}
};

const methods = {
	enter: function (element) {
		element.removeAttribute('hidden');
	},
	leave: function (element) {
		element.setAttribute('hidden', true);
	}
};

export default {
	// data,
	// computed,
	// methods
}
</script>
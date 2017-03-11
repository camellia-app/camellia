<template>
<li>
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
</li>
</template>

<script>
	import { mapGetters } from 'vuex';

	const props = ['bookmark'];

	const data = function () {
		return {
			clicksCount:           {},
			displayClickCounter:   {},
			openBookmarksInNewTab: null
		};
	};

	const computed = {
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
			},
			...mapGetters(['bs'])
	};

	const methods = {
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
						&& this.clicksCount[this.bookmark.id] > 0
						? this.clicksCount[this.bookmark.id].roundThousands()
						: '';

				return this.clicksCount[this.bookmark.id];
			},
			mapBsToData (bs) {
				this.clicksCount = bs.local_storage['click_counter'];
				this.displayClickCounter = bs.local_storage['click_counter'];
				this.openBookmarksInNewTab = bs.local_storage['click_counter'];
			}
	};

	const watch = {
		bs: {
			handler() {
				this.mapBsToData(this.bs);
			}
		}
	}

	export default {
		props,
		data,
		computed,
		methods,
		watch
	}
</script>
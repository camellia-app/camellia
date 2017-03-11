<template>
<li
:class="'col-xs-' + columnSize">
	<ul>
		<bookmark
		v-for="bookmark in bookmarks"
		:key="bookmark.id"
		:bookmark="bookmark"></bookmark>
	</ul>
</li>
</template>

<script>
import Bookmark from './Bookmark';

const props = ['bookmarks', 'columnSize'];

const components = {
	Bookmark
};

export default {
	props,
	components
};
</script>
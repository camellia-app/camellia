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
export default {
	props: ['bookmarks', 'columnSize']
}
</script>
<template>
	<footer>
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
	</footer>
</template>

<script>
const data = function () {
	return {
			issuesUrl:      '',
			releasesUrl:    '',
			optionsUrl:     '',
			browserVersion: '',
			isDevBuild:     '',
			locale:         []
	}
};

export default {
	data
};
</script>
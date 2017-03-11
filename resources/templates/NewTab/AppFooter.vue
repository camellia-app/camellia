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
import { mapGetters } from 'vuex';
import { i18nObject, modal } from '../../assets/js/_functions';

const data = function () {
	return {
		issuesUrl: null,
		releasesUrl: null,
		optionsUrl: null,
		browserVersion: null,
		isDevBuild: null,
		locale: i18nObject([
			'search', 'manage_bookmarks', 'options', 'help', 'report_bug', 'extensions'
		])
	};
};

const computed = mapGetters(['bs']);

const methods = {
	mapBsToData (bs) {
		this.issuesUrl = bs.extensionInfo.homepageUrl + '/issues';
		this.releasesUrl = bs.extensionInfo.homepageUrl + '/releases';
		this.optionsUrl = 'chrome://extensions/?options=' + bs.extensionInfo.id;
		this.browserVersion = 'v' + bs.extensionInfo.version;
		this.isDevBuild = bs.extensionInfo.installType === 'development';
	}
}

const watch = {
	bs: {
		handler() {
			this.mapBsToData(this.bs);
		}
	}
};


export default {
	data,
	computed,
	methods,
	watch
};
</script>
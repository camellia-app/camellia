<template>
<div class="modal fade" id="modal-vote-remind" tabindex="-1" role="dialog" aria-labelledby="modal-vote-remind-label" aria-hidden="true">
	пусто блядь
	<!--<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
				:aria-label="locale.close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h2 class="h4 modal-title text-truncate" id="modal-vote-remind-label">
					{{ locale.rate_extension }}
				</h2>
			</div>
			<div class="modal-body"
			v-html="locale.rate_extension_description">
			</div>
		</div>
	</div>-->
</div>
</template>

<script>
const data = function () {
	return {
		locale: i18nObject([
			'close', 'rate_extension', ['rate_extension_description', 'https://chrome.google.com/webstore/detail/' + browser.i18n.getMessage('@@extension_id')]
		])
	}
};

const mouted = function () {
	if (sync_storage['vote_remind_displayed'] === false
	&& sync_storage['installation_date'] + 1000 * 60 * 60 * 24 * 14 < Date.now()) {
		$('#modal-vote-remind').modal('show');

		browser.storage.sync.set({vote_remind_displayed: true});
	}
};

export default {
	
}
</script>
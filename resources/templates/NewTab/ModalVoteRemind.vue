<template>
<div class="modal fade" id="modal-vote-remind" tabindex="-1" role="dialog" aria-labelledby="modal-vote-remind-label" aria-hidden="true">
	<div class="modal-dialog" role="document">
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
	</div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { i18nObject, modal } from '../../assets/js/_functions';

const data = function () {
	return {
		sync_storage: null,
		locale: i18nObject([
			'close', 'rate_extension', ['rate_extension_description', 'https://chrome.google.com/webstore/detail/' + browser.i18n.getMessage('@@extension_id')]
		])
	}
};


const computed = mapGetters(['bs']);

const watch = {
	bs: {
		handler() {
			this.sync_storage = this.bs.sync_storage;
			this.checkDateInstalled();
		}
	}
};

const methods = {
	checkDateInstalled() {
		const sync_storage = this.sync_storage;
		if (sync_storage['vote_remind_displayed'] === false && sync_storage['installation_date'] + 1000 * 60 * 60 * 24 * 14 < Date.now()) {

			const voteModal = document.querySelector('#modal-vote-remind');
			modal(voteModal, 'show');

			browser.storage.sync.set({vote_remind_displayed: true});

		}
	}
};

export default {
	data,
	computed,
	methods,
	watch
}
</script>
<template>
	<div class="modal fade" id="modal-help" tabindex="-1" role="dialog" aria-labelledby="modal-help-label" aria-hidden="true">
		пусто блядь
		<!--<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
					:aria-label="locale.close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h2 class="h4 modal-title text-truncate" id="modal-help-label">
						{{ locale.help }}
					</h2>
				</div>
				<div class="modal-body">
					<transition class="modal-body"
					tag="div"
					name="fade-faster"
					mode="out-in">
						<ol
						v-if="currentQuestion < 0">
							<li	v-for="(question, index) in faq"
							:key="index">
								<a class="underlined" tabindex="0"
								v-html="question.title"
								@click="viewAnswer(index)"></a>
							</li>
						</ol>
						<div
						v-else>
							<div
							v-for="(question, index) in faq"
							:key="index"
							v-if="index === currentQuestion">
								<h3 class="h5 pb-1"
								v-html="question.title"></h3>

								<div
								v-html="question.answer"></div>

								<div class="text-xs-right mt-1">
									<a class="underlined" tabindex="0"
									@click="viewQuestions">{{ locale.back_to_questions }}</a>
								</div>
							</div>
						</div>
					</transition>
				</div>
			</div>
		</div>-->
	</div>
</template>

<script>
const data = function () {
	return {
		currentQuestion: -1,
		faq: [{
			'title': browser.i18n.getMessage('help_reason_to_use_title'),
			'answer': browser.i18n.getMessage('help_reason_to_use_answer')
		}, {
			'title': browser.i18n.getMessage('help_omnibox_search_title'),
			'answer': browser.i18n.getMessage('help_omnibox_search_answer', [
				browser.runtime.getManifest().omnibox.keyword
			])
		}, {
			'title': browser.i18n.getMessage('help_which_browsers_supported_title'),
			'answer': browser.i18n.getMessage('help_which_browsers_supported_answer')
		}, {
			'title': browser.i18n.getMessage('help_why_permissions_title'),
			'answer': browser.i18n.getMessage('help_why_permissions_answer')
		}, {
			'title': browser.i18n.getMessage('help_request_permissions_title'),
			'answer': browser.i18n.getMessage('help_request_permissions_answer')
		}, {
			'title': browser.i18n.getMessage('help_change_theme_title'),
			'answer': browser.i18n.getMessage('help_change_theme_answer')
		}, {
			'title': browser.i18n.getMessage('help_screenshots_title'),
			'answer': browser.i18n.getMessage('help_screenshots_answer')
		}, {
			'title': browser.i18n.getMessage('help_manage_bookmarks_title'),
			'answer': browser.i18n.getMessage('help_manage_bookmarks_answer')
		}, {
			'title': browser.i18n.getMessage('help_planned_features_title'),
			'answer': browser.i18n.getMessage('help_planned_features_answer', [
				browser.runtime.getManifest().homepage_url + '/projects'
			])
		}, {
			'title': browser.i18n.getMessage('help_ctrl_f_title'),
			'answer': browser.i18n.getMessage('help_ctrl_f_answer')
		}, {
			'title': browser.i18n.getMessage('help_background_author_title'),
			'answer': browser.i18n.getMessage('help_background_author_answer')
		}],
		locale: i18nObject([
			'close', 'help', 'back_to_questions'
		])
	}
}

const methods = {
	viewAnswer: function (index) {
			this.currentQuestion = index;
	},
	viewQuestions: function () {
		this.currentQuestion = -1;
	}
};

export default {

};
</script>
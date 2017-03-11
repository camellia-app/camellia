<template>
	<div id="app">
		<app>
			<app-content></app-content>
			<app-footer></app-footer>
			<modal-search></modal-search>
			<modal-help></modal-help>
			<modal-vote-remind></modal-vote-remind>
		</app>
	</div>
</template>

<script>
import $ from 'jquery';
import { mapGetters } from 'vuex';

import App from './NewTab/App';
import AppContent from './NewTab/AppContent';
import AppFooter from './NewTab/AppFooter';

import ModalSearch from './NewTab/ModalSearch';
import ModalHelp from './NewTab/ModalHelp';
import ModalVoteRemind from './NewTab/ModalVoteRemind';


const components = {
	App,
	AppContent,
	AppFooter,
	ModalSearch,
	ModalHelp,
	ModalVoteRemind
};

const computed = mapGetters(['bs'])

const mounted = function () {
	if (Object.keys(this.bs).length === 0) {
		this.$store.dispatch('getData');
	}

	$(document).on('shown.bs.modal', '.modal', function () {
		$(this).find('[autofocus]').focus();
	});

	$(document).on('click', '[href^="chrome://"]', function (event) {
		event.preventDefault();
		
		browser.tabs.create({
			url: $(this).attr('href')
		});
	});

	$(window).on('keydown', function (event) {
		if (event.keyCode === 114 || (event.ctrlKey && event.keyCode === 70)) { 
			event.preventDefault();

			$('.modal').not('#modal-search').modal('hide'); // Hide all modals but search modal
			$('#modal-search').modal('toggle');
		}
	});

	document.documentElement.lang = browser.i18n.getMessage('locale');
	document.querySelector('title').textContent = browser.i18n.getMessage('new_tab');

}

const watch = {
	bs: {
		handler() {
			const { 
				backgroundImage,
				backgroundBrightness,
				local_storage } = this.bs;

			$('<img>').attr('src', backgroundImage)
			.on('load', function() {
				$(this).remove();

				$('#configurable-styles')
				.append(`body:before { background-image: url(${backgroundImage}); opacity: ${backgroundBrightness}; }`);
			})
			.on('error', function() {
				$('#configurable-styles')
				.append(`body:before { background-color: rgb(255,255,255); opacity: ${backgroundBrightness}; }`);
				
				browser.notifications.create({
					'type': 'basic',
					'iconUrl': '/img/logo/512x512-colored.png',
					'title': browser.i18n.getMessage('background_loading_error_title'),
					'message': browser.i18n.getMessage('background_loading_error_message')
				});
			});

			// Style scrollbar
			if (local_storage['use_custom_scrollbar'] === false) {
				$('body').removeClass('custom-scrollbar');
			}

			// User select
			if (local_storage['user_select'] === true) {
				$('body').removeClass('disabled-user-select');
			}

			// Set font size
			$('#configurable-styles').append(`body { font-size: ${local_storage['font_size']}px; }`);
		}
	}
};

export default {
	name: 'newtab',
	components,
	computed,
	mounted,
	watch
};

</script>
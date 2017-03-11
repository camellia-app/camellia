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
import { modal } from '../assets/js/_functions';

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

	document.addEventListener('keydown', event => {
		const modals = document.querySelectorAll('.modal');

		if (event.code === 'F3' || (event.ctrlKey && event.code === 'KeyF' || event.code === 'KeyG')) {
			event.preventDefault();
			const modalSearch = document.querySelector('#modal-search');

			if (!modalSearch.classList.contains('in')) {
				for (let modal of modals) {
					if (modal.classList.contains('in') && !modal.matches('#modal-search')) {
						modal(modal, false);
					}
				}
				modal(modalSearch, true);
			} else {
				modal(modalSearch, false);
			}
		}
	});

	document.addEventListener('click', event => {
		if (event.target.matches('[href^="chrome://"]')) {
			event.preventDefault();
			browser.tabs.create({
				url: event.target.href
			});
		}
	});

	document.documentElement.lang = browser.i18n.getMessage('locale');
	document.querySelector('title').textContent = browser.i18n.getMessage('new_tab');

		/*
	|--------------------------------------------------------------------------
	| Google Analytics
	|--------------------------------------------------------------------------
	*/

	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-63968909-6', 'auto');

	ga('set', 'appName', browser.runtime.getManifest().name);
	ga('set', 'appVersion', browser.runtime.getManifest().version);
	ga('set', 'appId', browser.i18n.getMessage('@@extension_id'));

	ga('send', 'pageview');

}

const watch = {
	bs: {
		handler() {
			const { 
				backgroundImage,
				backgroundBrightness,
				local_storage } = this.bs;
			
				const img = document.createElement('img')
				img.src = backgroundImage;
				img.onload = () => {
					img.remove()
					document.head.insertAdjacentHTML('beforeEnd', `
						<style>
							body:before {
								background-image: url(${backgroundImage});
								opacity: ${backgroundBrightness}; }
							body {
								font-size: ${local_storage['font_size']}px; }
						</style>
					`);
				};
				img.onerror = () => {
					document.head.insertAdjacentHTML('beforeEnd', `
						<style>
							body:before {
								background-color: rgb(255,255,255);
								opacity: ${backgroundBrightness}; }
							body {
								font-size: ${local_storage['font_size']}px; }
						</style>
					`);
					browser.notifications.create({
						type: 'basic',
						iconUrl: '/img/logo/512x512-colored.png',
						title: browser.i18n.getMessage('background_loading_error_title'),
						message: browser.i18n.getMessage('background_loading_error_message')
					});
				}

			// Style scrollbar
			if (local_storage['use_custom_scrollbar'] === false) {
				document.body.classList.remove('custom-scrollbar');
			}

			// User select
			if (local_storage['user_select'] === true) {
				document.body.classList.remove('disabled-user-select');
			}

		}
	}
};

export default {
	components,
	computed,
	mounted,
	watch
};

</script>
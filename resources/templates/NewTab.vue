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

export default {
	name: 'newtab',
	components
}
</script>
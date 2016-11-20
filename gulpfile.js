'use strict';

const elixir = require('laravel-elixir');

//require('laravel-elixir-vue-2');

elixir(mix => {
	/* Options */
	mix
		.sass('./resources/assets/sass/options.scss', './public/css/options.css')
		.scripts([
			'./node_modules/vue/dist/vue.js',
			'./node_modules/jquery/dist/jquery.js',
			'./resources/assets/js/vendor/browser-polyfill.js',
			'./resources/assets/js/_variables.js',
			'./resources/assets/js/_functions.js',
			'./resources/assets/js/options.js'
		], './public/js/options.js');
	
	/* Background */
	mix
		.scripts([
			'./resources/assets/js/vendor/browser-polyfill.js',
			'./resources/assets/js/_variables.js',
			'./resources/assets/js/_functions.js',
			'./resources/assets/js/background.js',
		], './public/js/background.js');

	/* Newtab */
	mix
		.sass('./resources/assets/sass/newtab.scss', './public/css/newtab.css')
		.scripts([
			'./node_modules/vue/dist/vue.js',
			'./node_modules/jquery/dist/jquery.js',
			'./node_modules/bootstrap/js/dist/util.js',
			'./node_modules/bootstrap/js/dist/collapse.js',
			'./node_modules/bootstrap/js/dist/modal.js',
			'./resources/assets/js/vendor/browser-polyfill.js',
			'./resources/assets/js/_variables.js',
			'./resources/assets/js/_functions.js',
			'./resources/assets/js/newtab.js',
		], './public/js/newtab.js');
});

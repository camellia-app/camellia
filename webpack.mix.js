const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 | Docs: https://laravel.com/docs/master/mix
 */

/* Options */
mix.sass('./resources/assets/sass/options.scss', './public/css/options.css');
mix.scripts([
    './node_modules/vue/dist/vue.js',
    './node_modules/jquery/dist/jquery.js',
    './resources/assets/js/vendor/browser-polyfill.js',
    './resources/assets/js/_variables.js',
    './resources/assets/js/_functions.js',
    './resources/assets/js/options.js'
], './public/js/options.js');

/* Background */
mix.scripts([
    './node_modules/crypto-js-npm/rollups/md5.js',
    './resources/assets/js/vendor/browser-polyfill.js',
    './resources/assets/js/_variables.js',
    './resources/assets/js/_functions.js',
    './resources/assets/js/background.js',
], './public/js/background.js');

/* Newtab */
mix.sass('./resources/assets/sass/newtab.scss', './public/css/newtab.css');
mix.scripts([
    './node_modules/crypto-js-npm/rollups/md5.js',
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

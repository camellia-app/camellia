'use strict';

Promise.all([
    browser.storage.local.get(),
    browser.storage.sync.get()
])
.then(([local_storage, sync_storage]) => {
	/*
	|--------------------------------------------------------------------------
	| Options core
	|--------------------------------------------------------------------------
	|
	| Contains all options & logic.
	*/

	Vue.component('app', {
		data: function () {
			return {
				show: false,
				available_columns: AVAILABLE_COLUMNS,

				background_image:      local_storage['background_image'],
				columns_count:         local_storage['columns_count'],
				use_custom_scrollbar:  local_storage['use_custom_scrollbar'],
				display_click_counter: local_storage['display_click_counter'],
				user_select:           local_storage['user_select'],
				font_size:             local_storage['font_size'],
				bookmarks_in_new_tab:  local_storage['bookmarks_in_new_tab'],
				top_sites:             local_storage['top_sites'],
				recently_closed:       local_storage['recently_closed'],

				locale: i18nObject([
					'save',

					'option_background_image_label',
					'option_background_image_hint',
					
					'option_columns_count_label',
					'option_columns_count_column',
					'option_columns_count_hint',
					
					'option_use_custom_scrollbar_label',
					'option_use_custom_scrollbar_styled',
					'option_use_custom_scrollbar_system',
					'option_use_custom_scrollbar_hint',

					'option_display_click_counter_label',
					'option_display_click_counter_display',
					'option_display_click_counter_hide',
					'option_display_click_counter_hint',

					'option_user_select_label',
					'option_user_select_enabled',
					'option_user_select_disabled',
					'option_user_select_hint',

					'option_font_size_label',
					'option_font_size_hint',

					'option_bookmarks_in_new_tab_label',
					'option_bookmarks_in_new_tab_new_tab',
					'option_bookmarks_in_new_tab_current_tab',
					'option_bookmarks_in_new_tab_hint',

					'option_top_sites_label',
					'option_top_sites_display',
					'option_top_sites_hide',
					'option_top_sites_hint',

					'option_recently_closed_label',
					'option_recently_closed_display',
					'option_recently_closed_hide',
					'option_recently_closed_hint',
				])
			};
		},
		mounted: function () {
			this.show = true;
		},
		methods: {
			saveOptions: function () {
				this.background_image = this.background_image.length > 0
									  ? this.background_image
									  : '/img/wallpaper.jpg';

				local_storage['background_image']      = this.background_image;
				local_storage['columns_count']         = parseInt(this.columns_count);
				local_storage['use_custom_scrollbar']  = this.use_custom_scrollbar == 1;
				local_storage['display_click_counter'] = this.display_click_counter == 1;
				local_storage['user_select']           = this.user_select == 1;
				local_storage['font_size']             = parseInt(this.font_size);
				local_storage['bookmarks_in_new_tab']  = this.bookmarks_in_new_tab == 1;
				local_storage['top_sites']             = this.top_sites == 1;
				local_storage['recently_closed']       = this.recently_closed == 1;

				chrome.storage.local.set(local_storage);
			},
		},
		template: `<transition name="fade">
				<form
					@submit.prevent="saveOptions"
					v-if="show">
						<label class="label" for="background_image">
							{{ locale.option_background_image_label }}
						</label>
						<input type="text" id="background_image"
						v-model="background_image">
						<small>{{ locale.option_background_image_hint }}</small>

						<hr>

						<label class="label" for="columns_count">
							{{ locale.option_columns_count_label }}
						</label>
						<select id="columns_count" required
						v-model="columns_count">
							<option
							v-for="columnValue in available_columns"
							:value="columnValue"
							:selected="columnValue == columns_count">
								{{ columnValue }}
								{{ locale.option_columns_count_column }}
							</option>
						</select>
						<small>{{ locale.option_columns_count_hint }}</small>

						<hr>

						<label class="label" for="use_custom_scrollbar">
							{{ locale.option_use_custom_scrollbar_label }}
						</label>
						<select id="use_custom_scrollbar" required
						v-model="use_custom_scrollbar">
							<option value="1"
							:selected="1 === use_custom_scrollbar">
								{{ locale.option_use_custom_scrollbar_styled }}
							</option>
							<option value="0"
							:selected="0 === use_custom_scrollbar">
								{{ locale.option_use_custom_scrollbar_system }}
							</option>
						</select>
						<small>{{ locale.option_use_custom_scrollbar_hint }}</small>

						<hr>

						<label class="label" for="display_click_counter">
							{{ locale.option_display_click_counter_label }}
						</label>
						<select id="display_click_counter" required
						v-model="display_click_counter">
							<option value="1"
							:selected="1 == display_click_counter">
								{{ locale.option_display_click_counter_display }}
							</option>
							<option value="0"
							:selected="0 == display_click_counter">
								{{ locale.option_display_click_counter_hide }}	
							</option>
						</select>
						<small>{{ locale.option_display_click_counter_hint }}</small>

						<hr>

						<label class="label" for="user_select">
							{{ locale.option_user_select_label }}
						</label>
						<select id="user_select" required
						v-model="user_select">
							<option value="1"
							:selected="1 == user_select">
								{{ locale.option_user_select_enabled }}
							</option>
							<option value="0"
							:selected="0 == user_select">
								{{ locale.option_user_select_disabled }}	
							</option>
						</select>
						<small>{{ locale.option_user_select_hint }}</small>

						<hr>

						<label class="label" for="font_size">
							{{ locale.option_font_size_label }}
						</label>
						<input type="number" id="font_size" maxlength="2" required
						v-model="font_size">
						<small>{{ locale.option_font_size_hint }}</small>

						<hr>

						<label class="label" for="bookmarks_in_new_tab">
							{{ locale.option_bookmarks_in_new_tab_label }}
						</label>
						<select id="bookmarks_in_new_tab" required
						v-model="bookmarks_in_new_tab">
							<option value="1"
							:selected="1 == bookmarks_in_new_tab">
								{{ locale.option_bookmarks_in_new_tab_new_tab }}
							</option>
							<option value="0"
							:selected="0 == user_select">
								{{ locale.option_bookmarks_in_new_tab_current_tab }}	
							</option>
						</select>
						<small>{{ locale.option_bookmarks_in_new_tab_hint }}</small>

						<hr>

						<label class="label" for="top_sites">
							{{ locale.option_top_sites_label }}
						</label>
						<select id="top_sites" required
						v-model="top_sites">
							<option value="1"
							:selected="1 == top_sites">
								{{ locale.option_top_sites_display }}
							</option>
							<option value="0"
							:selected="0 == top_sites">
								{{ locale.option_top_sites_hide }}	
							</option>
						</select>
						<small>{{ locale.option_top_sites_hint }}</small>

						<hr>

						<label class="label" for="recently_closed">
							{{ locale.option_recently_closed_label }}
						</label>
						<select id="recently_closed" required
						v-model="recently_closed">
							<option value="1"
							:selected="1 == recently_closed">
								{{ locale.option_recently_closed_display }}
							</option>
							<option value="0"
							:selected="0 == recently_closed">
								{{ locale.option_recently_closed_hide }}	
							</option>
						</select>
						<small>{{ locale.option_recently_closed_hint }}</small>

						<hr>

						<button type="submit">{{ locale.save }}</button>
				</form>
			</transition>`,
	});

	const app = new Vue({
		el: '#app'
	});
})
.catch(error => {
	browser.notifications.create({
		'type': 'basic',
		'iconUrl': '/img/logo/512x512-colored.png',
		'title': browser.i18n.getMessage('error_occured'),
		'message': error.message
	});
});

$('html').attr('lang', browser.i18n.getMessage('locale'));
$('title').text(browser.i18n.getMessage('options'));

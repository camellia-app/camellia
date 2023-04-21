import { config } from '../../config';

export type BackgroundProviderType = 'link' | 'unsplash_collection';
export type ContentLayoutType = 'centered' | 'fluid';
export type BackgroundBrightnessType = 'bright' | 'reduced_brightness';

export type OptionsTypeMap = {
  background_brightness: BackgroundBrightnessType;
  background_image_link: string;
  background_image_unsplash_collection: string;
  background_provider_type: BackgroundProviderType;
  blur_background: boolean;
  content_layout: ContentLayoutType;
  display_unsplash_attribution: boolean;
  show_bookmark_manager_button: boolean;
  show_options_button: boolean;
  show_search_button: boolean;
};

export type OptionKey = keyof OptionsTypeMap;
export type BooleanOptionKey =
  | 'blur_background'
  | 'display_unsplash_attribution'
  | 'show_bookmark_manager_button'
  | 'show_options_button'
  | 'show_search_button';
export type StringOptionKey = 'background_image_link' | 'background_image_unsplash_collection';
export type EnumOptionKey = 'background_brightness' | 'background_provider_type' | 'content_layout';

export const optionDefaults: OptionsTypeMap = {
  background_brightness: 'bright',
  background_image_link: 'https://images.unsplash.com/photo-1615931632997-c592e375d6ef',
  background_image_unsplash_collection: `https://unsplash.com/collections/${config.unsplash.defaultCollectionId}`,
  background_provider_type: 'unsplash_collection',
  blur_background: false,
  content_layout: 'centered',
  display_unsplash_attribution: true,
  show_bookmark_manager_button: true,
  show_options_button: true,
  show_search_button: true,
};

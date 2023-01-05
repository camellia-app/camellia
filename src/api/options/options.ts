import { config } from '../../config';

export enum BackgroundProviderType {
  Link = 'link',
  UnsplashCollection = 'unsplash_collection',
}

export enum ContentLayoutType {
  Centered = 'centered',
  Fluid = 'fluid',
}

export enum BackgroundBrightnessType {
  Bright = 'bright',
  ReducedBrightness = 'reduced_brightness',
}

export type OptionsTypeMap = {
  background_brightness: BackgroundBrightnessType;
  background_image_link: string;
  background_image_unsplash_collection_id: string;
  background_provider_type: BackgroundProviderType;
  content_layout: ContentLayoutType;
  display_unsplash_attribution: boolean;
  show_bookmark_manager_button: boolean;
  show_options_button: boolean;
  show_search_button: boolean;
};

export type OptionKey = keyof OptionsTypeMap;
export type BooleanOptionKey =
  | 'display_unsplash_attribution'
  | 'show_bookmark_manager_button'
  | 'show_options_button'
  | 'show_search_button';
export type StringOptionKey = 'background_image_link' | 'background_image_unsplash_collection_id';
export type EnumOptionKey = 'background_brightness' | 'background_provider_type' | 'content_layout';

export const optionDefaults: OptionsTypeMap = {
  background_brightness: BackgroundBrightnessType.Bright,
  background_image_link: 'https://images.unsplash.com/photo-1615931632997-c592e375d6ef',
  background_image_unsplash_collection_id: `https://unsplash.com/collections/${config.unsplash.defaultCollectionId}`,
  background_provider_type: BackgroundProviderType.UnsplashCollection,
  content_layout: ContentLayoutType.Centered,
  display_unsplash_attribution: true,
  show_bookmark_manager_button: true,
  show_options_button: true,
  show_search_button: true,
};

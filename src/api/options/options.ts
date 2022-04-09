export enum BackgroundProviderType {
  Link = 'link',
  UnsplashCollection = 'unsplash_collection',
}

export enum ContentLayoutType {
  Centered = 'centered',
  Fluid = 'fluid',
}

export type OptionsTypeMap = {
  background_image_link: string;
  background_image_unsplash_collection_id: string;
  background_provider_type: BackgroundProviderType;
  content_layout: ContentLayoutType;
  display_unsplash_attribution: boolean;
  installation_date: number;
  show_bookmark_manager_button: boolean;
  show_options_button: boolean;
  vote_remind_displayed: boolean;
};

export type OptionKey = keyof OptionsTypeMap;
export type BooleanOptionKey =
  | 'display_unsplash_attribution'
  | 'show_bookmark_manager_button'
  | 'show_options_button'
  | 'vote_remind_displayed';
export type StringOptionKey = 'background_image_link' | 'background_image_unsplash_collection_id';
export type EnumOptionKey = 'background_provider_type' | 'content_layout';

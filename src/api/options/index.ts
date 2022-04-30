import { storage } from '../storage';
import { StorageKeyDoesNotExist } from '../storage/common';
import type { OptionChangeHandler, OptionChangeHandlerDestructor } from './common';
import { OptionIsNotSetError } from './common';
import type { OptionKey, OptionsTypeMap } from './options';
import { BackgroundProviderType, ContentLayoutType } from './options';

export const setOption = async <TKey extends OptionKey, TValue extends OptionsTypeMap[TKey]>(
  key: TKey,
  value: TValue,
): Promise<void> => {
  console.info(`Setting option with key "${key}" to value:`, value);

  await storage.synchronizable.set(key, value);
};

export const getOption = async <TKey extends OptionKey, TValue extends OptionsTypeMap[TKey]>(
  key: TKey,
): Promise<TValue> => {
  console.log(`Retrieving an option by key "${key}"`);

  try {
    return storage.synchronizable.get<TValue>(key);
  } catch (error: unknown) {
    if (error instanceof StorageKeyDoesNotExist) {
      throw new OptionIsNotSetError(key);
    }

    throw error;
  }
};

export const isOptionSet = async <TKey extends OptionKey>(key: TKey): Promise<boolean> => {
  console.log(`Checking is option with key "${key}" set`);

  return storage.synchronizable.exists(key);
};

export const setOptionIfNotSet = async <TKey extends OptionKey, TValue extends OptionsTypeMap[TKey]>(
  key: TKey,
  value: TValue,
): Promise<void> => {
  console.group(`Setting an option with key "${key}" if not set...`);

  if (await isOptionSet(key)) {
    return;
  }

  await setOption(key, value);

  console.groupEnd();
};

export const subscribeToOptionChanges = <TKey extends OptionKey, TValue extends OptionsTypeMap[TKey]>(
  key: TKey,
  handler: OptionChangeHandler<TValue>,
): OptionChangeHandlerDestructor => {
  console.log(`Subscribing to changes of an option with key "${key}"`);

  const storageSubscriptionDestructor = storage.synchronizable.subscribeToKeyChanges(key, handler);

  return (): void => {
    storageSubscriptionDestructor();
  };
};

export const setDefaultOptionValues = async (): Promise<void> => {
  console.group('Setting up default values for options...');

  await Promise.all([
    setOptionIfNotSet('installation_date', Date.now()),
    setOptionIfNotSet('vote_remind_displayed', false),
    setOptionIfNotSet('background_image_link', 'https://images.unsplash.com/photo-1615931632997-c592e375d6ef'),
    setOptionIfNotSet('background_image_unsplash_collection_id', 'https://unsplash.com/collections/10745553'),
    setOptionIfNotSet('background_provider_type', BackgroundProviderType.UnsplashCollection),
    setOptionIfNotSet('content_layout', ContentLayoutType.Fluid),
    setOptionIfNotSet('display_unsplash_attribution', true),
    setOptionIfNotSet('show_bookmark_manager_button', true),
    setOptionIfNotSet('show_options_button', true),
    setOptionIfNotSet('show_search_button', true),
  ]);

  console.groupEnd();
};

export const resetOptionsToDefaultValues = async (): Promise<void> => {
  console.group('Resetting all options to default values...');

  await Promise.all([
    setOption('installation_date', Date.now()),
    setOption('vote_remind_displayed', false),
    setOption('background_image_link', 'https://images.unsplash.com/photo-1615931632997-c592e375d6ef'),
    setOption('background_image_unsplash_collection_id', 'https://unsplash.com/collections/10745553'),
    setOption('background_provider_type', BackgroundProviderType.UnsplashCollection),
    setOption('content_layout', ContentLayoutType.Fluid),
    setOption('display_unsplash_attribution', true),
    setOption('show_bookmark_manager_button', true),
    setOption('show_options_button', true),
    setOption('show_search_button', true),
  ]);

  console.groupEnd();
};

export const migrateOptions = async (): Promise<void> => {
  console.group('Migrating options...');

  // migrate from 1.9.0 to 2.0.0

  const oldBackgroundImageKey = 'background_image';

  if (await storage.synchronizable.exists(oldBackgroundImageKey)) {
    console.info('Migrating old "%s" option...', oldBackgroundImageKey);

    const backgroundImageUrl = await storage.synchronizable.get<string>(oldBackgroundImageKey);

    await Promise.all([
      storage.synchronizable.delete(oldBackgroundImageKey),
      setOption('background_image_link', backgroundImageUrl),
      setOption('background_provider_type', BackgroundProviderType.Link),
    ]);
  }

  console.groupEnd();
};

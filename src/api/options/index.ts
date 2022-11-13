import * as Sentry from '@sentry/react';
import { logOptionsSet, logOptionsSubscribe } from '../logger';
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
  const span = Sentry.getCurrentHub()
    .getScope()
    ?.getTransaction()
    ?.startChild({
      op: 'setOption',
      description: key,
      tags: {
        key: key,
      },
    });

  logOptionsSet(key, value);

  await storage.synchronizable.set(key, value);

  span?.setStatus('ok').finish();
};

export const getOption = async <TKey extends OptionKey, TValue extends OptionsTypeMap[TKey]>(
  key: TKey,
): Promise<TValue> => {
  const span = Sentry.getCurrentHub()
    .getScope()
    ?.getTransaction()
    ?.startChild({
      op: 'getOption',
      description: key,
      tags: {
        key: key,
      },
    });

  let value: TValue;

  try {
    console.count(`Getting option "${key}"`);

    value = await storage.synchronizable.get<TValue>(key);

    span?.setStatus('ok');
  } catch (error: unknown) {
    if (error instanceof StorageKeyDoesNotExist) {
      span?.setStatus('not_found');

      throw new OptionIsNotSetError(key);
    }

    span?.setStatus('unknown_error');

    throw error;
  }

  span?.finish();

  return value;
};

export const isOptionSet = async <TKey extends OptionKey>(key: TKey): Promise<boolean> => {
  const span = Sentry.getCurrentHub()
    .getScope()
    ?.getTransaction()
    ?.startChild({
      op: 'isOptionSet',
      description: key,
      tags: {
        key: key,
      },
    });

  const value = storage.synchronizable.exists(key);

  span?.setStatus('ok').finish();

  return value;
};

export const setOptionIfNotSet = async <TKey extends OptionKey, TValue extends OptionsTypeMap[TKey]>(
  key: TKey,
  value: TValue,
): Promise<void> => {
  if (await isOptionSet(key)) {
    return;
  }

  await setOption(key, value);
};

export const subscribeToOptionChanges = <TKey extends OptionKey, TValue extends OptionsTypeMap[TKey]>(
  key: TKey,
  handler: OptionChangeHandler<TValue>,
): OptionChangeHandlerDestructor => {
  logOptionsSubscribe(key);

  const storageSubscriptionDestructor = storage.synchronizable.subscribeToKeyChanges(key, handler);

  return (): void => {
    storageSubscriptionDestructor();
  };
};

export const setDefaultOptionValues = async (): Promise<void> => {
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
};

export const resetOptionsToDefaultValues = async (): Promise<void> => {
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
};

export const migrateOptions = async (): Promise<void> => {
  console.info('Migrating options...');

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
};

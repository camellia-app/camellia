import type { OptionChangeHandler, OptionChangeHandlerDestructor } from './common';
import type { OptionKey, OptionsTypeMap } from './options';

import { storage } from '../storage';
import { StorageKeyDoesNotExist } from '../storage/common';
import { optionDefaults } from './options';

export const setOption = async <TKey extends OptionKey, TValue extends OptionsTypeMap[TKey]>(
  key: TKey,
  value: TValue,
): Promise<void> => {
  await storage.synchronizable.set(`option_${key}`, value);
};

export const getOption = async <TKey extends OptionKey, TValue extends OptionsTypeMap[TKey]>(
  key: TKey,
): Promise<TValue> => {
  try {
    const promisedValue = storage.synchronizable.get<TValue>(`option_${key}`);

    return await promisedValue;
  } catch (error: unknown) {
    if (error instanceof StorageKeyDoesNotExist) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const defaultValue = optionDefaults[key] as TValue;

      return defaultValue;
    }

    throw error;
  }
};

export const subscribeToOptionChanges = <TKey extends OptionKey, TValue extends OptionsTypeMap[TKey]>(
  key: TKey,
  handler: OptionChangeHandler<TValue>,
): OptionChangeHandlerDestructor => {
  const storageSubscriptionDestructor = storage.synchronizable.subscribeToKeyChanges<TValue>(
    `option_${key}`,
    (newValue) => {
      handler(newValue);
    },
  );

  return (): void => {
    storageSubscriptionDestructor();
  };
};

export const resetOptionsToDefaultValues = async (): Promise<void> => {
  const optionKeys = Object.keys(optionDefaults);

  await Promise.all(optionKeys.map((key) => storage.synchronizable.delete(`option_${key}`)));
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
      setOption('background_provider_type', 'link'),
    ]);
  }
};

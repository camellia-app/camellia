import englishTranslations from '../../../translations/en/messages.json';
import { AppPlatform, getPlatform } from '../appEnvironment';

type TranslationKey = keyof typeof englishTranslations;

export const t = (key: TranslationKey, placeholders?: Array<string>): string => {
  switch (getPlatform()) {
    case AppPlatform.Chromium:
      return getChromiumTranslatedMessage(key, placeholders);

    case AppPlatform.Webext:
      return getWebextTranslatedMessage(key, placeholders);

    case AppPlatform.Web:
      return getWebTranslatedMessage(key);
  }
};

const getWebextTranslatedMessage = (key: TranslationKey, placeholders?: Array<string>): string => {
  const message = browser.i18n.getMessage(key, placeholders ?? []);

  if (message === '') {
    throw Error(`There are no translation messages with key "${key}"`);
  }

  return message;
};

const getChromiumTranslatedMessage = (key: TranslationKey, placeholders?: Array<string>): string => {
  const message = chrome.i18n.getMessage(key, placeholders ?? []);

  if (message === '') {
    throw Error(`There are no translation messages with key "${key}"`);
  }

  return message;
};

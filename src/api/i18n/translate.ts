import { AppPlatform, getPlatform } from '../appEnvironment';

export const t = (key: string, placeholders?: Array<string>): string => {
  switch (getPlatform()) {
    case AppPlatform.Chromium:
      return getChromiumTranslatedMessage(key, placeholders);

    case AppPlatform.Webext:
      return getWebextTranslatedMessage(key, placeholders);
  }
};

const getWebextTranslatedMessage = (key: string, placeholders?: Array<string>): string => {
  const message = browser.i18n.getMessage(key, placeholders ?? []);

  if (message === '') {
    throw Error(`There are no translation messages with key "${key}"`);
  }

  return message;
};

const getChromiumTranslatedMessage = (key: string, placeholders?: Array<string>): string => {
  const message = chrome.i18n.getMessage(key, placeholders ?? []);

  if (message === '') {
    throw Error(`There are no translation messages with key "${key}"`);
  }

  return message;
};

import englishTranslations from '../../../translations/en/messages.json';
import russianTranslations from '../../../translations/ru/messages.json';
import { AppPlatform, getPlatform } from '../appEnvironment';

type TranslationKey = keyof typeof englishTranslations | keyof typeof russianTranslations;

type TranslationEntry = {
  message: string;
  placeholders?: Record<
    string,
    {
      content?: string;
      example?: string;
    }
  >;
};

export const t = (key: TranslationKey, placeholderReplacements?: Array<string>): string => {
  switch (getPlatform()) {
    case AppPlatform.Chromium:
      return getChromiumTranslatedMessage(key, placeholderReplacements);

    case AppPlatform.Webext:
      return getWebextTranslatedMessage(key, placeholderReplacements);

    case AppPlatform.Web:
      return getWebTranslatedMessage(key, placeholderReplacements);
  }
};

const getWebextTranslatedMessage = (key: TranslationKey, placeholderReplacements?: Array<string>): string => {
  const message = browser.i18n.getMessage(key, placeholderReplacements ?? []);

  if (message === '') {
    throw Error(`There are no translation messages with key "${key}"`);
  }

  return message;
};

const getChromiumTranslatedMessage = (key: TranslationKey, placeholderReplacements?: Array<string>): string => {
  const message = chrome.i18n.getMessage(key, placeholderReplacements ?? []);

  if (message === '') {
    throw Error(`There are no translation messages with key "${key}"`);
  }

  return message;
};

const getWebTranslatedMessage = (key: TranslationKey, placeholderReplacements?: Array<string>): string => {
  const translationEntry = getTranslationEntry(key);
  let translationMessage = translationEntry.message;
  const translationPlaceholders = translationEntry.placeholders;

  if (translationPlaceholders !== undefined) {
    const inTextNamedPlaceholders = translationMessage.match(/\$[A-Z0-9_]+\$/g) ?? [];

    for (const inTextNamedPlaceholder of inTextNamedPlaceholders) {
      const namedPlaceholderKey = inTextNamedPlaceholder
        .slice(1, -1) // remove $ symbols
        .toLowerCase();

      const namedPlaceholderContentReplacement = translationPlaceholders[namedPlaceholderKey]?.content;

      if (namedPlaceholderContentReplacement !== undefined) {
        translationMessage = translationMessage.replace(inTextNamedPlaceholder, namedPlaceholderContentReplacement);
      }
    }
  }

  if (placeholderReplacements !== undefined) {
    const inTextIndexedPlaceholders = translationMessage.match(/\$[1-9][0-9]*/g) ?? [];

    for (const inTextIndexedPlaceholder of inTextIndexedPlaceholders) {
      const placeholderIndex = parseInt(inTextIndexedPlaceholder.substring(1), 10) - 1;

      const indexedPlaceholderContentReplacement = placeholderReplacements[placeholderIndex];

      if (indexedPlaceholderContentReplacement !== undefined) {
        translationMessage = translationMessage.replace(inTextIndexedPlaceholder, indexedPlaceholderContentReplacement);
      }
    }
  }

  return translationMessage;
};

/**
 * NOTE: For web only
 */
const getTranslationEntry = (key: TranslationKey): TranslationEntry => {
  switch (getLanguage()) {
    case 'ru':
      return russianTranslations[key];

    default:
      return englishTranslations[key];
  }
};

/**
 * NOTE: For web only
 */
const getLanguage = (): string => {
  const [language] = window.navigator.language.split('-');

  if (language === 'ru') {
    return 'ru';
  }

  return 'en';
};

import * as Sentry from '@sentry/browser';
import englishTranslations from '../../../translations/en/messages.json';
import russianTranslations from '../../../translations/ru/messages.json';
import { getPlatform, isMacOs } from '../appEnvironment';

export type TranslationKey = keyof typeof englishTranslations | keyof typeof russianTranslations;

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
    case 'chromium':
      return getChromiumTranslatedMessage(key, placeholderReplacements);

    case 'webext':
      return getWebextTranslatedMessage(key, placeholderReplacements);

    case 'web':
      return getWebTranslatedMessage(key, placeholderReplacements);
  }
};

export const getEnterKeyName = (): string => {
  if (isMacOs()) {
    return '⏎ return';
  }

  return '↵ Enter';
};

export const getCtrlKeyName = (): string => {
  if (isMacOs()) {
    return '⌘ Command';
  }

  return 'Ctrl';
};

const getWebextTranslatedMessage = (key: TranslationKey, placeholderReplacements?: Array<string>): string => {
  const message = browser.i18n.getMessage(key, placeholderReplacements ?? []);

  if (message === '') {
    console.warn(`There is no translation message with key "${key}"`);
    Sentry.captureMessage(`There is no translation message with key "${key}"`);

    return key;
  }

  return message;
};

const getChromiumTranslatedMessage = (key: TranslationKey, placeholderReplacements?: Array<string>): string => {
  const message = chrome.i18n.getMessage(key, placeholderReplacements ?? []);

  if (message === '') {
    console.warn(`There is no translation message with key "${key}"`);
    Sentry.captureMessage(`There is no translation message with key "${key}"`);

    return key;
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

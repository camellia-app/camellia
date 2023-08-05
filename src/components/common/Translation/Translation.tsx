import type { FC } from 'react';

import type { TranslationKey } from '../../../api/i18n/translate';

import { t } from '../../../api/i18n/translate';

export const Translation: FC<{
  placeholderReplacements?: Array<string> | undefined;
  translationKey: TranslationKey;
}> = (props) => {
  return <span dangerouslySetInnerHTML={{ __html: t(props.translationKey, props.placeholderReplacements) }} />;
};

import type { FC, ReactNode } from 'react';

import { t } from '../../../api/i18n/translate';
import { Paragraph } from '../Paragraph/Paragraph';
import { Checkbox } from './Checkbox';
import { labeledCheckbox } from './LabeledCheckbox.module.css';

export const LabeledCheckbox: FC<{
  /**
   * What will happen on clicking the checkbox.
   */
  changeHandler?: ((newValue: boolean) => void) | undefined;

  /**
   * Description of the checkbox.
   */
  description: ReactNode;

  /**
   * Disable checkbox (click handler won't work too).
   *
   * @default false
   */
  disabled?: boolean | undefined;

  /**
   * Text label on checkbox.
   */
  label: string;

  /**
   * Link that points to some external documentation.
   */
  learnMoreLink?: string | undefined;

  /**
   * Show loading animation.
   *
   * @default false
   */
  loading?: boolean | undefined;

  /**
   * Value of the checkbox.
   */
  value: boolean | undefined;
}> = (props) => {
  return (
    <div className={labeledCheckbox}>
      <Checkbox
        changeHandler={props.changeHandler}
        disabled={props.disabled}
        label={props.label}
        loading={props.loading}
        value={props.value}
      />

      <Paragraph>
        {props.description}

        {props.learnMoreLink !== undefined && (
          <>
            {' '}
            <a href={props.learnMoreLink} rel="noreferrer noopener" target="_blank">
              {t('optionsPage_optionControl_learnMoreLink')}
            </a>
          </>
        )}
      </Paragraph>
    </div>
  );
};

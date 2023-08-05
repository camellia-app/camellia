import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import { Paragraph } from '../Paragraph/Paragraph';
import { ActionButton } from './ActionButton';
import { labeledActionButton } from './LabeledActionButton.module.css';

export const LabeledActionButton: FC<{
  /**
   * HTML button [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) attribute value.
   */
  buttonHtmlType: NonNullable<ButtonHTMLAttributes<HTMLButtonElement>['type']>;

  /**
   * What will happen on clicking the button.
   */
  clickHandler?: (() => void) | undefined;

  /**
   * Description of the button.
   */
  description: ReactNode;

  /**
   * Disable button (click handler won't work too).
   *
   * @default false
   */
  disabled?: boolean | undefined;

  /**
   * Text label on button.
   */
  label: string;

  /**
   * Show loading animation.
   *
   * @default false
   */
  loading?: boolean | undefined;
}> = (props) => {
  return (
    <div className={labeledActionButton}>
      <ActionButton
        buttonHtmlType={props.buttonHtmlType}
        clickHandler={props.clickHandler}
        disabled={props.disabled}
        label={props.label}
        loading={props.loading}
      />

      <Paragraph>{props.description}</Paragraph>
    </div>
  );
};

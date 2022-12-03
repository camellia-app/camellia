import classNames from 'classnames';
import type { FC, ButtonHTMLAttributes, MouseEventHandler } from 'react';
import { actionButton, actionButtonControl, actionButtonLoading } from './ActionButton.module.css';

export const ActionButton: FC<{
  /**
   * HTML button [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) attribute value.
   */
  buttonHtmlType: NonNullable<ButtonHTMLAttributes<HTMLButtonElement>['type']>;

  /**
   * What will happen on clicking the button.
   */
  clickHandler?: (() => void) | undefined;

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
  const clickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    if (props.clickHandler !== undefined) {
      props.clickHandler();
    }
  };

  return (
    <div
      className={classNames(actionButton, {
        [actionButtonLoading]: props.loading === true,
      })}
    >
      <button
        className={actionButtonControl}
        disabled={props.disabled === true}
        onClick={clickHandler}
        type={props.buttonHtmlType}
      >
        {props.label}
      </button>
    </div>
  );
};

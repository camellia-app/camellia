import type { FC, ButtonHTMLAttributes, MouseEventHandler } from 'react';
import classNames from 'classnames';
import { actionButton, actionButtonControl, actionButtonLoading } from './ActionButton.module.css';

export const ActionButton: FC<{
  buttonHtmlType: NonNullable<ButtonHTMLAttributes<HTMLButtonElement>['type']>;
  clickHandler?: (() => void) | undefined;
  disabled: boolean;
  label: string;
  loading: boolean;
}> = (props) => {
  const clickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    if (props.clickHandler !== undefined) {
      props.clickHandler();
    }
  };

  return (
    <div
      className={classNames(actionButton, {
        [actionButtonLoading]: props.loading,
      })}
    >
      <button
        className={actionButtonControl}
        disabled={props.disabled}
        onClick={clickHandler}
        type={props.buttonHtmlType}
      >
        {props.label}
      </button>
    </div>
  );
};

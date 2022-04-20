import s from './ActionButton.module.css';
import type { VFC, ButtonHTMLAttributes, MouseEventHandler } from 'react';
import classNames from 'classnames';

export const ActionButton: VFC<{
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
      className={classNames(s.actionButton, {
        [s.actionButtonLoading]: props.loading,
      })}
    >
      <button
        className={s.actionButtonControl}
        disabled={props.disabled}
        onClick={clickHandler}
        type={props.buttonHtmlType}
      >
        {props.label}
      </button>
    </div>
  );
};

import type { ChangeEventHandler, FC } from 'react';

import { clsx } from 'clsx';

import { checkbox, checkboxControl, checkboxControlIndeterminate, checkboxLoading } from './Checkbox.module.css';

export const Checkbox: FC<{
  /**
   * What will happen on clicking the checkbox.
   */
  changeHandler?: ((newValue: boolean) => void) | undefined;

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
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (props.changeHandler !== undefined) {
      props.changeHandler(event.target.checked);
    }
  };

  const isInIndeterminateState = props.value === undefined;

  return (
    <label
      className={clsx(checkbox, {
        [checkboxLoading]: props.loading === true,
      })}
    >
      <input
        checked={props.value === true}
        disabled={props.disabled === true}
        onChange={handleChange}
        type="checkbox"
      />
      <span
        className={clsx(checkboxControl, {
          [checkboxControlIndeterminate]: isInIndeterminateState,
        })}
      >
        {props.label}
      </span>
    </label>
  );
};

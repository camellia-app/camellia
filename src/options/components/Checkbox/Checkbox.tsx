import type { ChangeEventHandler, FC } from 'react';
import classNames from 'classnames';
import { checkbox, checkboxControl, checkboxControlIndeterminate, checkboxLoading } from './Checkbox.module.css';

export const Checkbox: FC<{
  changeHandler?: ((newValue: boolean) => void) | undefined;
  disabled: boolean;
  label: string;
  loading: boolean;
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
      className={classNames(checkbox, {
        [checkboxLoading]: props.loading,
      })}
    >
      <input checked={props.value === true} disabled={props.disabled} onChange={handleChange} type="checkbox" />
      <span
        className={classNames(checkboxControl, {
          [checkboxControlIndeterminate]: isInIndeterminateState,
        })}
      >
        {props.label}
      </span>
    </label>
  );
};

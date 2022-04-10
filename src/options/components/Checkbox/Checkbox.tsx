import s from './Checkbox.module.css';
import type { ChangeEventHandler, VFC } from 'react';
import cn from 'classnames';

export const Checkbox: VFC<{
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
      className={cn(s.checkbox, {
        [s.checkboxLoading]: props.loading,
      })}
    >
      <input checked={props.value === true} disabled={props.disabled} onChange={handleChange} type="checkbox" />
      <span
        className={cn(s.checkboxControl, {
          [s.checkboxControlIndeterminate]: isInIndeterminateState,
        })}
      >
        {props.label}
      </span>
    </label>
  );
};

import type { ChangeEventHandler, ReactElement } from 'react';
import classNames from 'classnames';
import { dropdownSelect, dropdownSelectControl, dropdownSelectLoading } from './DropdownSelect.module.css';

export type SelectOption<TValue extends string> = {
  label: string;
  value: TValue;
};

export type SelectOptionGroup<TValue extends string> = {
  options: Array<SelectOption<TValue>>;
  title: string;
};

type DropdownSelectProps<TValue extends string> = {
  changeHandler?: ((newValue: TValue) => void) | undefined;
  disabled: boolean;
  loading: boolean;
  options: Array<SelectOption<TValue> | SelectOptionGroup<TValue>>;
  value: TValue | undefined;
};

const isOptionGroup = (value: object): value is SelectOptionGroup<string> => 'options' in value;

export const DropdownSelect = <TValue extends string>(props: DropdownSelectProps<TValue>): ReactElement => {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    if (props.changeHandler !== undefined) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      props.changeHandler(event.currentTarget.value as TValue);
    }
  };

  return (
    <div
      className={classNames(dropdownSelect, {
        [dropdownSelectLoading]: props.loading,
      })}
    >
      <select className={dropdownSelectControl} disabled={props.disabled} onChange={handleChange} value={props.value}>
        {props.value === undefined ? <option /> : undefined}

        {props.options.map((optionEntry) => {
          if (isOptionGroup(optionEntry)) {
            return (
              <optgroup key={optionEntry.title} label={optionEntry.title}>
                {optionEntry.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            );
          }

          return (
            <option key={optionEntry.value} value={optionEntry.value}>
              {optionEntry.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

import type { ReactElement, ReactNode } from 'react';

import type { SelectOption, SelectOptionGroup } from './DropdownSelect';

import { Paragraph } from '../Paragraph/Paragraph';
import { DropdownSelect } from './DropdownSelect';
import {
  labeledDropdownSelect,
  labeledDropdownSelectLabel,
  labeledDropdownSelectLabelAndControlWrapper,
} from './LabeledDropdownSelect.module.css';

type LabeledDropdownSelectProps<TValue extends string> = {
  /**
   * What will happen on selecting an option.
   */
  changeHandler?: ((newValue: TValue) => void) | undefined;

  /**
   * Description of the select.
   */
  description: ReactNode;

  /**
   * Disable dropdown (click handler won't work too).
   *
   * @default false
   */
  disabled?: boolean | undefined;

  /**
   * Text label above dropdown select.
   */
  label: string;

  /**
   * Show loading animation.
   *
   * @default false
   */
  loading?: boolean | undefined;

  /**
   * Possible values to chose from.
   */
  options: Array<SelectOption<TValue> | SelectOptionGroup<TValue>>;

  /**
   * Current value chosen in dropdown select.
   */
  value: TValue | undefined;
};

export const LabeledDropdownSelect = <TValue extends string>(
  props: LabeledDropdownSelectProps<TValue>,
): ReactElement => {
  return (
    <div className={labeledDropdownSelect}>
      <label className={labeledDropdownSelectLabelAndControlWrapper}>
        <span className={labeledDropdownSelectLabel}>{props.label}</span>

        <div>
          <DropdownSelect
            changeHandler={props.changeHandler}
            disabled={props.disabled}
            loading={props.loading}
            options={props.options}
            value={props.value}
          />
        </div>
      </label>

      <Paragraph>{props.description}</Paragraph>
    </div>
  );
};

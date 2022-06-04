import type { SelectOption, SelectOptionGroup } from './DropdownSelect';
import { DropdownSelect } from './DropdownSelect';
import type { ReactElement } from 'react';
import { Paragraph } from '../Paragraph/Paragraph';
import {
  labeledDropdownSelect,
  labeledDropdownSelectLabel,
  labeledDropdownSelectLabelAndControlWrapper,
} from './LabeledDropdownSelect.module.css';

type LabeledDropdownSelectProps<TValue extends string> = {
  changeHandler?: ((newValue: TValue) => void) | undefined;
  description: string;
  disabled: boolean;
  label: string;
  loading: boolean;
  options: Array<SelectOption<TValue> | SelectOptionGroup<TValue>>;
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

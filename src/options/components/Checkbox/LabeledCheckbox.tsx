import s from './LabeledCheckbox.module.css';
import type { VFC } from 'react';
import { Checkbox } from './Checkbox';
import { Paragraph } from '../Paragraph/Paragraph';

type LabeledCheckboxProps = {
  changeHandler?: ((newValue: boolean) => void) | undefined;
  description: string;
  disabled: boolean;
  label: string;
  loading: boolean;
  value: boolean | undefined;
};

export const LabeledCheckbox: VFC<LabeledCheckboxProps> = (props) => {
  return (
    <div className={s.labeledCheckbox}>
      <Checkbox
        changeHandler={props.changeHandler}
        disabled={props.disabled}
        label={props.label}
        loading={props.loading}
        value={props.value}
      />

      <Paragraph>{props.description}</Paragraph>
    </div>
  );
};

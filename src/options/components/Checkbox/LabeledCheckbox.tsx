import s from './LabeledCheckbox.module.css';
import type { FC } from 'react';
import { Checkbox } from './Checkbox';
import { Paragraph } from '../Paragraph/Paragraph';

export const LabeledCheckbox: FC<{
  changeHandler?: ((newValue: boolean) => void) | undefined;
  description: string;
  disabled: boolean;
  label: string;
  loading: boolean;
  value: boolean | undefined;
}> = (props) => {
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

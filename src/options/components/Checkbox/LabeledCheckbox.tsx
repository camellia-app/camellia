import type { FC } from 'react';
import { Checkbox } from './Checkbox';
import { Paragraph } from '../Paragraph/Paragraph';
import { labeledCheckbox } from './LabeledCheckbox.module.css';

export const LabeledCheckbox: FC<{
  changeHandler?: ((newValue: boolean) => void) | undefined;
  description: string;
  disabled: boolean;
  label: string;
  loading: boolean;
  value: boolean | undefined;
}> = (props) => {
  return (
    <div className={labeledCheckbox}>
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

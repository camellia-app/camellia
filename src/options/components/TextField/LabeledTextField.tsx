import s from './LabeledTextField.module.css';
import type { VFC } from 'react';
import { TextField } from './TextField';
import { Paragraph } from '../Paragraph/Paragraph';

export const LabeledTextField: VFC<{
  changeHandler?: ((newValue: string) => void) | undefined;
  description: string;
  disabled: boolean;
  label: string;
  loading: boolean;
  pattern?: string | undefined;
  placeholder: string;
  spellCheck: boolean;
  type: 'number' | 'url';
  validate?: ((newValue: string) => string | undefined) | undefined;
  value: string | undefined;
}> = (props) => {
  return (
    <div className={s.labeledTextField}>
      <label className={s.labeledTextFieldLabelAndControlWrapper}>
        <span className={s.labeledTextFieldLabel}>{props.label}</span>

        <div>
          <TextField
            changeHandler={props.changeHandler}
            disabled={props.disabled}
            loading={props.loading}
            pattern={props.pattern}
            placeholder={props.placeholder}
            spellCheck={props.spellCheck}
            type={props.type}
            validate={props.validate}
            value={props.value}
          />
        </div>
      </label>

      <Paragraph>{props.description}</Paragraph>
    </div>
  );
};
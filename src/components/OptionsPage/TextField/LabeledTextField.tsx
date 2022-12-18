import type { FC, ReactNode } from 'react';
import { TextField } from '../../common/TextField/TextField';
import { Paragraph } from '../Paragraph/Paragraph';
import {
  labeledTextField,
  labeledTextFieldLabel,
  labeledTextFieldLabelAndControlWrapper,
} from './LabeledTextField.module.css';

export const LabeledTextField: FC<{
  /**
   * What will happen on typing to the text field.
   */
  changeHandler?: ((newValue: string) => void) | undefined;

  /**
   * Description of the text field.
   */
  description: ReactNode;

  /**
   * Disable checkbox (click handler won't work too).
   *
   * @default false
   */
  disabled?: boolean | undefined;

  /**
   * Text label above the text field.
   */
  label: string;

  /**
   * Show loading animation.
   *
   * @default false
   */
  loading?: boolean | undefined;

  /**
   * Regular expression to validate value.
   * Will be passed to [`pattern`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#pattern) attribute.
   */
  pattern?: string | undefined;

  /**
   * What should be shown when input is empty.
   */
  placeholder: string;

  /**
   * Do spell check or not.
   *
   * @default false
   */
  spellCheck?: boolean | undefined;

  /**
   * HTML [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#type) attribute.
   */
  type: 'number' | 'url';

  /**
   * Function to validate user input.
   */
  validate?: ((newValue: string) => string | undefined) | undefined;

  /**
   * Initial value of the input.
   */
  value: string | undefined;
}> = (props) => {
  return (
    <div className={labeledTextField}>
      <label className={labeledTextFieldLabelAndControlWrapper}>
        <span className={labeledTextFieldLabel}>{props.label}</span>

        <div>
          <TextField
            changeHandler={props.changeHandler}
            controlWidth={'short'}
            disabled={props.disabled}
            loading={props.loading}
            pattern={props.pattern}
            placeholder={props.placeholder}
            required={true}
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

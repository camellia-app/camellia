import type { ChangeEventHandler, FC } from 'react';
import { useRef } from 'react';
import classNames from 'classnames';
import { textField, textFieldControl, textFieldLoading } from './TextField.module.css';

export const TextField: FC<{
  /**
   * What will happen on typing to the text field.
   */
  changeHandler?: ((newValue: string) => void) | undefined;

  /**
   * Disable checkbox (click handler won't work too).
   *
   * @default false
   */
  disabled?: boolean | undefined;

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
  const inputElementRef = useRef<HTMLInputElement>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (inputElementRef.current === null) {
      return;
    }

    inputElementRef.current.setCustomValidity(''); // clear previously set custom error message to do not affect reportValidity method

    // is input valid by HTML5 attributes?
    if (!inputElementRef.current.reportValidity()) {
      return;
    }

    const newValue = event.target.value;

    if (props.validate !== undefined) {
      const validationErrorMessage = props.validate(newValue);

      if (validationErrorMessage !== undefined) {
        inputElementRef.current.setCustomValidity(validationErrorMessage);
        inputElementRef.current.reportValidity();

        return;
      }
    }

    if (props.changeHandler !== undefined) {
      props.changeHandler(newValue);
    }
  };

  return (
    <div
      className={classNames(textField, {
        [textFieldLoading]: props.loading === true,
      })}
    >
      <input
        autoCorrect="off"
        className={textFieldControl}
        defaultValue={props.value}
        disabled={props.disabled === true}
        onChange={handleChange}
        pattern={props.pattern}
        placeholder={props.placeholder}
        ref={inputElementRef}
        required
        spellCheck={props.spellCheck === true}
        type={props.type}
      />
    </div>
  );
};

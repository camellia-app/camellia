import type { ChangeEventHandler, FC } from 'react';

import { clsx } from 'clsx';
import { useEffect, useRef } from 'react';

import { textField, textFieldControl, textFieldFluid, textFieldLoading } from './TextField.module.css';

export const TextField: FC<{
  /**
   * Focus input automatically.
   *
   * @default false
   */
  autoFocus?: boolean | undefined;

  /**
   * What will happen on typing to the text field.
   */
  changeHandler?: ((newValue: string) => void) | undefined;

  /**
   * Width of the control. Fluid is 100% width.
   */
  controlWidth: 'fluid' | 'short';

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
   * Add required attribute.
   *
   * @default false
   */
  required?: boolean | undefined;

  /**
   * Do spell check or not.
   *
   * @default false
   */
  spellCheck?: boolean | undefined;

  /**
   * HTML [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#type) attribute.
   */
  type: 'number' | 'search' | 'url';

  /**
   * Function to validate user input.
   */
  validate?: ((newValue: string) => Promise<string | undefined>) | undefined;

  /**
   * Initial value of the input.
   */
  value: string | undefined;
}> = (props) => {
  const inputElementRef = useRef<HTMLInputElement>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
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
      const validationErrorMessage = await props.validate(newValue);

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

  useEffect(() => {
    if (props.autoFocus === true) {
      inputElementRef?.current?.focus();
    }
  }, [props.autoFocus]);

  return (
    <div
      className={clsx(textField, {
        [textFieldFluid]: props.controlWidth === 'fluid',
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
        required={props.required === true}
        spellCheck={props.spellCheck === true}
        type={props.type}
      />
    </div>
  );
};

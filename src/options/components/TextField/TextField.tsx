import s from './TextField.module.css';
import type { ChangeEventHandler, VFC } from 'react';
import { useRef } from 'react';
import cn from 'classnames';

type TextFieldProps = {
  changeHandler?: ((newValue: string) => void) | undefined;
  disabled: boolean;
  loading: boolean;
  pattern?: string | undefined;
  placeholder: string;
  spellCheck: boolean;
  type: 'number' | 'url';
  validate?: ((newValue: string) => string | undefined) | undefined;
  value: string | undefined;
};

export const TextField: VFC<TextFieldProps> = (props) => {
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
      className={cn(s.textField, {
        [s.textFieldLoading]: props.loading,
      })}
    >
      <input
        autoCorrect="off"
        className={s.textFieldControl}
        defaultValue={props.value}
        disabled={props.disabled}
        onChange={handleChange}
        pattern={props.pattern}
        placeholder={props.placeholder}
        ref={inputElementRef}
        required
        spellCheck={props.spellCheck}
        type={props.type}
      />
    </div>
  );
};

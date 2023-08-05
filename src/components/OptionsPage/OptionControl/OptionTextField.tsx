import type { FC, ReactNode } from 'react';

import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';

import type { StringOptionKey } from '../../../api/options/options';

import { useOption } from '../../../api/options/hook';
import { LabeledTextField } from '../TextField/LabeledTextField';

export const OptionTextField: FC<{
  description: ReactNode;
  label: string;
  optionKey: StringOptionKey;
  pattern?: string | undefined;
  placeholder: string;
  spellCheck: boolean;
  type: 'number' | 'url';
  validate?: ((value: string) => Promise<string | undefined>) | undefined;
}> = (props) => {
  const [optionValue, setOptionValue] = useOption(props.optionKey);
  const [isLoading, setIsLoading] = useState<boolean>(optionValue === undefined);

  useEffect(() => {
    setIsLoading(optionValue === undefined);
  }, [optionValue]);

  return (
    <LabeledTextField
      changeHandler={debounce((newValue): void => {
        if (optionValue === newValue) {
          return;
        }

        setIsLoading(true);

        setTimeout(() => {
          setOptionValue(newValue);
        }, 500);
      }, 1000)}
      description={props.description}
      disabled={false}
      label={props.label}
      loading={isLoading}
      pattern={props.pattern}
      placeholder={props.placeholder}
      spellCheck={props.spellCheck}
      type={props.type}
      validate={props.validate}
      value={optionValue}
    />
  );
};

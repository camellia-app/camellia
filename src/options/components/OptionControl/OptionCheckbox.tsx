import type { VFC } from 'react';
import { useOption } from '../../../api/options/hook';
import { useEffect, useState } from 'react';
import { LabeledCheckbox } from '../Checkbox/LabeledCheckbox';
import type { BooleanOptionKey } from '../../../api/options/options';

export const OptionCheckbox: VFC<{
  description: string;
  label: string;
  optionKey: BooleanOptionKey;
}> = (props) => {
  const [optionValue, setOptionValue] = useOption(props.optionKey);
  const [isLoading, setIsLoading] = useState<boolean>(optionValue === undefined);

  useEffect(() => {
    setIsLoading(optionValue === undefined);
  }, [optionValue]);

  return (
    <LabeledCheckbox
      changeHandler={(newValue): void => {
        setIsLoading(true);

        setTimeout(() => {
          setOptionValue(newValue);
        }, 500);
      }}
      description={props.description}
      disabled={false}
      label={props.label}
      loading={isLoading}
      value={optionValue}
    />
  );
};

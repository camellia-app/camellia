import type { VoidFunctionComponent } from 'react';
import { useOption } from '../../../hooks/useOption';
import { useEffect, useState } from 'react';
import { LabeledCheckbox } from '../Checkbox/LabeledCheckbox';
import type { BooleanOptionKey } from '../../../api/options/options';

type OptionCheckboxProps = {
  description: string;
  label: string;
  optionKey: BooleanOptionKey;
};

export const OptionCheckbox: VoidFunctionComponent<OptionCheckboxProps> = (props) => {
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

import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useOption } from '../../../api/options/hook';
import type { BooleanOptionKey } from '../../../api/options/options';
import { LabeledCheckbox } from '../Checkbox/LabeledCheckbox';

export const OptionCheckbox: FC<{
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
      learnMoreLink="https://github.com/camellia-app/camellia/wiki/Privacy-Policy"
      loading={isLoading}
      value={optionValue}
    />
  );
};

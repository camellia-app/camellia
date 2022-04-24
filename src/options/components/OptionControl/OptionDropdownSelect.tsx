import { useOption } from '../../../api/options/hook';
import type { VFC } from 'react';
import { useEffect, useState } from 'react';
import { LabeledDropdownSelect } from '../DropdownSelect/LabeledDropdownSelect';
import type { SelectOption, SelectOptionGroup } from '../DropdownSelect/DropdownSelect';
import type { EnumOptionKey, OptionsTypeMap } from '../../../api/options/options';

export const OptionDropdownSelect: VFC<{
  description: string;
  dropdownOptions: Array<
    SelectOption<OptionsTypeMap[EnumOptionKey]> | SelectOptionGroup<OptionsTypeMap[EnumOptionKey]>
  >;
  label: string;
  optionKey: EnumOptionKey;
}> = (props) => {
  const [optionValue, setOptionValue] = useOption(props.optionKey);
  const [isLoading, setIsLoading] = useState<boolean>(optionValue === undefined);

  useEffect(() => {
    setIsLoading(optionValue === undefined);
  }, [optionValue]);

  return (
    <LabeledDropdownSelect
      changeHandler={(newValue): void => {
        if (optionValue === newValue) {
          return;
        }

        setIsLoading(true);

        setTimeout(() => {
          setOptionValue(newValue);
        }, 500);
      }}
      description={props.description}
      disabled={false}
      label={props.label}
      loading={isLoading}
      options={props.dropdownOptions}
      value={optionValue}
    />
  );
};
